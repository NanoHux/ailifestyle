"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planningService = exports.PlanningService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const deepseek_1 = require("../ai/deepseek");
class PlanningService {
    async generateOrUpdateDayPlan(userId, date, userInput) {
        // 1. Get User Profile for context (timezone, preferences)
        const profile = await prisma_1.default.userProfile.findUnique({ where: { userId } });
        if (!profile) {
            throw new Error(`UserProfile not found for user ${userId}`);
        }
        // 1.1 Get Existing Plan
        const planDate = this.normalizeDate(date);
        const existingPlan = await prisma_1.default.dayPlan.findUnique({
            where: { userId_planDate: { userId, planDate } },
            include: { blocks: true }
        });
        let context = `User Profile: ${JSON.stringify(profile)}`;
        if (existingPlan) {
            context += `\nExisting Plan: ${JSON.stringify(existingPlan)}`;
        }
        // 2. Call AI
        const aiResponse = await deepseek_1.aiClient.generateDayPlan(context, date, profile, userInput);
        // 3. Save to DB
        // Upsert DayPlan
        // Prisma requires distinct Date objects for DateTime fields
        // const planDate = new Date(date); // Removed to avoid redeclaration error
        const dayPlan = await prisma_1.default.dayPlan.upsert({
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
        // Delete existing blocks for this day (Simpler for MVP than smart diffing)
        // In a real app, we might want to keep "done" blocks or ask the user
        await prisma_1.default.planBlock.deleteMany({
            where: { dayPlanId: dayPlan.id }
        });
        // Create new blocks
        for (const block of aiResponse.blocks) {
            // Convert HH:MM string to Date object based on the plan date
            const startTime = this.combineDateAndTime(date, block.start);
            const endTime = this.combineDateAndTime(date, block.end);
            await prisma_1.default.planBlock.create({
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
            blocks: await prisma_1.default.planBlock.findMany({ where: { dayPlanId: dayPlan.id } })
        };
    }
    combineDateAndTime(dateStr, timeStr) {
        return new Date(`${dateStr}T${timeStr}:00Z`);
    }
    normalizeDate(dateStr) {
        return new Date(`${dateStr}T00:00:00.000Z`);
    }
    async getDayPlan(userId, date) {
        // Ensure date is strictly the date part, but Prisma DateTime is usually full timestamp
        // For this app, we assume planDate is stored as YYYY-MM-DDT00:00:00.000Z usually, 
        // but let's be careful. In schema it is DateTime.
        // We should probably store it as midnight UTC or local.
        // For simplicity, let's assume the client sends 'YYYY-MM-DD' and we convert to Date
        const planDate = this.normalizeDate(date);
        return prisma_1.default.dayPlan.findUnique({
            where: { userId_planDate: { userId, planDate } },
            include: {
                blocks: {
                    orderBy: { startTime: 'asc' }
                }
            }
        });
    }
}
exports.PlanningService = PlanningService;
exports.planningService = new PlanningService();
//# sourceMappingURL=planning.service.js.map