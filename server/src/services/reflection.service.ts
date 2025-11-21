import prisma from '../utils/prisma';
import { aiClient } from '../ai/deepseek';

export class ReflectionService {
  async submitReflection(userId: number, date: string, data: { selfRating: number; userNotes: string }) {
      // 1. Get Today's Plan and Blocks
      // Assuming date is "YYYY-MM-DD"
      const planDate = new Date(date);
      const dayPlan = await prisma.dayPlan.findFirst({
          where: { userId, planDate }, // using findFirst as unique constraint might act weird with date objects sometimes, but findUnique is better if key is correct.
          // actually findUnique requires the exact composite key object.
          // let's try findFirst for safety with Date matching, or use findUnique with constructed unique input
      });

      // Re-fetching with blocks if found, or just use include above
      const dayPlanWithBlocks = await prisma.dayPlan.findUnique({
          where: { userId_planDate: { userId, planDate } },
          include: { blocks: true }
      });

      if (!dayPlanWithBlocks) {
          throw new Error("Day plan not found for reflection");
      }

      // 2. Calculate completion rate
      const total = dayPlanWithBlocks.blocks.length;
      const completed = dayPlanWithBlocks.blocks.filter((b: any) => b.status === 'done').length;
      const completionRate = total > 0 ? (completed / total) * 100 : 0;

      // 3. Call AI for Summary & Tomorrow's Plan
      const aiResponse = await aiClient.generateReflection(
          dayPlanWithBlocks,
          dayPlanWithBlocks.blocks,
          data
      );

      // 4. Save Reflection
      await prisma.dayReflection.upsert({
          where: { userId_planDate: { userId, planDate } },
          update: {
              selfRating: data.selfRating,
              userNotes: data.userNotes,
              aiSummary: aiResponse.summary,
              completionRate
          },
          create: {
              userId,
              planDate,
              selfRating: data.selfRating,
              userNotes: data.userNotes,
              aiSummary: aiResponse.summary,
              completionRate
          }
      });

      // 5. Save Tomorrow's Plan
      const tomorrowDateStr = aiResponse.tomorrow_plan.date;
      const tomorrowDate = new Date(tomorrowDateStr);

      const tomorrowPlan = await prisma.dayPlan.upsert({
        where: { userId_planDate: { userId, planDate: tomorrowDate } },
        update: {
            dayGoal: aiResponse.tomorrow_plan.day_goal,
            overallAdvice: aiResponse.tomorrow_plan.overall_advice,
            status: 'active'
        },
        create: {
            userId,
            planDate: tomorrowDate,
            dayGoal: aiResponse.tomorrow_plan.day_goal,
            overallAdvice: aiResponse.tomorrow_plan.overall_advice,
            status: 'active'
        }
    });

    // Clean up existing blocks for tomorrow if any (overwrite)
    await prisma.planBlock.deleteMany({
        where: { dayPlanId: tomorrowPlan.id }
    });

    for (const block of aiResponse.tomorrow_plan.blocks) {
        const startTime = new Date(`${tomorrowDateStr}T${block.start}:00Z`);
        const endTime = new Date(`${tomorrowDateStr}T${block.end}:00Z`);

        await prisma.planBlock.create({
            data: {
                dayPlanId: tomorrowPlan.id,
                startTime,
                endTime,
                title: block.title,
                description: block.description || null,
                notes: block.notes || null,
                category: block.category,
                priority: block.priority,
                status: 'pending'
            }
        });
    }

    return {
        summary: aiResponse.summary,
        tomorrowPlanId: tomorrowPlan.id
    };
  }
}

export const reflectionService = new ReflectionService();