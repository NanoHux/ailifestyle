import prisma from '../utils/prisma';
import { aiClient, DayPlanResponse } from '../ai/deepseek';

export class PlanningService {
  async generateOrUpdateDayPlan(userId: number, date: string, userInput: string) {
      // 1. Get User Profile for context (timezone, preferences)
      const profile = await prisma.userProfile.findUnique({ where: { userId } });
      
      if (!profile) {
        throw new Error(`UserProfile not found for user ${userId}`);
      }

      // 1.1 Get Existing Plan
      const planDate = this.normalizeDate(date);
      const existingPlan = await prisma.dayPlan.findUnique({
          where: { userId_planDate: { userId, planDate } },
          include: { blocks: true }
      });

      let context = `User Profile: ${JSON.stringify(profile)}`;
      if (existingPlan) {
          context += `\nExisting Plan: ${JSON.stringify(existingPlan)}`;
      }

      // 2. Call AI
      const aiResponse = await aiClient.generateDayPlan(
          context,
          date,
          profile,
          userInput
      );

      // 3. Save to DB
      // Upsert DayPlan
      // Prisma requires distinct Date objects for DateTime fields
      // const planDate = new Date(date); // Removed to avoid redeclaration error
      
      const dayPlan = await prisma.dayPlan.upsert({
          where: { userId_planDate: { userId, planDate } },
          update: {
              dayGoal: aiResponse.day_goal,
              overallAdvice: aiResponse.overall_advice,
              status: 'active'
          },
          create: {
              userId,
              planDate,
              dayGoal: aiResponse.day_goal,
              overallAdvice: aiResponse.overall_advice,
              status: 'active'
          }
      });

      // Archive existing blocks instead of deleting to preserve history.
      if (existingPlan) {
        await prisma.planBlock.updateMany({
          where: { dayPlanId: dayPlan.id },
          data: { status: 'archived', updatedAt: new Date() }
        });
      }

      // Create new blocks
      for (const block of aiResponse.blocks) {
          // Convert HH:MM string to Date object based on the plan date
          const startTime = this.combineDateAndTime(date, block.start);
          const endTime = this.combineDateAndTime(date, block.end);

          await prisma.planBlock.create({
              data: {
                  dayPlanId: dayPlan.id,
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
          ...dayPlan,
          blocks: await prisma.planBlock.findMany({
            where: {
              dayPlanId: dayPlan.id,
              status: { not: 'archived' }
            }
          })
      };
  }

  private combineDateAndTime(dateStr: string, timeStr: string): Date {
      return new Date(`${dateStr}T${timeStr}:00Z`);
  }
  
  private normalizeDate(dateStr: string): Date {
      return new Date(`${dateStr}T00:00:00.000Z`);
  }
  
  async getDayPlan(userId: number, date: string, includeArchived = false) {
      // Ensure date is strictly the date part, but Prisma DateTime is usually full timestamp
      // For this app, we assume planDate is stored as YYYY-MM-DDT00:00:00.000Z usually, 
      // but let's be careful. In schema it is DateTime.
      // We should probably store it as midnight UTC or local.
      // For simplicity, let's assume the client sends 'YYYY-MM-DD' and we convert to Date
      
      const planDate = this.normalizeDate(date);
      
      return prisma.dayPlan.findUnique({
          where: { userId_planDate: { userId, planDate } },
          include: {
              blocks: {
                  where: includeArchived ? undefined : { status: { not: 'archived' } },
                  orderBy: { startTime: 'asc' }
              }
          }
      });
  }
}

export const planningService = new PlanningService();
