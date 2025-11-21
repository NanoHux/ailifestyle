"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = exports.ChatService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const deepseek_1 = require("../ai/deepseek");
const planning_service_1 = require("./planning.service");
class ChatService {
    async createSession(userId, title) {
        return prisma_1.default.chatSession.create({
            data: {
                userId,
                title: title || `Chat started at ${new Date().toLocaleString()}`,
            },
        });
    }
    async getSessions(userId) {
        return prisma_1.default.chatSession.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
    }
    async getSessionMessages(sessionId, userId) {
        // Verify ownership
        const session = await prisma_1.default.chatSession.findUnique({
            where: { id: sessionId },
        });
        if (!session || session.userId !== userId) {
            throw new Error('Session not found or access denied');
        }
        return prisma_1.default.message.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async sendMessage(userId, sessionId, content) {
        const session = await prisma_1.default.chatSession.findUnique({
            where: { id: sessionId },
        });
        if (!session || session.userId !== userId) {
            throw new Error('Session not found or access denied');
        }
        // 1. Save User Message
        await prisma_1.default.message.create({
            data: {
                sessionId,
                userId,
                role: 'user',
                content,
            },
        });
        // 2. Fetch Context (Last 10 messages)
        const history = await prisma_1.default.message.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        const chatHistory = history.reverse().map((m) => ({ role: m.role, content: m.content }));
        // 3. Check intent (Simple Heuristic or AI determined)
        const lower = content.toLowerCase();
        const isPlanningRequest = lower.includes('plan') ||
            lower.includes('schedule') ||
            lower.includes('arrange') ||
            lower.includes('todo') ||
            lower.includes('task') ||
            lower.includes('安排') ||
            lower.includes('计划') ||
            lower.includes('日程') ||
            lower.includes('行程');
        let aiResponseText = '';
        let hasPlanUpdate = false;
        // If there's already no plan for today, treat any first message as a planning request to ensure Today page gets data
        const profile = await prisma_1.default.userProfile.findUnique({ where: { userId } });
        const timezone = profile?.timezone || 'UTC';
        const todayDate = new Date().toLocaleDateString('en-CA', { timeZone: timezone });
        const todayPlan = await planning_service_1.planningService.getDayPlan(userId, todayDate);
        if (isPlanningRequest || !todayPlan) {
            // Trigger Planning Flow
            const planResult = await planning_service_1.planningService.generateOrUpdateDayPlan(userId, todayDate, content);
            aiResponseText = `I've updated your plan for today (${todayDate}).\n\n${planResult.overallAdvice}`;
            hasPlanUpdate = true;
        }
        else {
            // Normal Chat Flow
            aiResponseText = await deepseek_1.aiClient.generateChatResponse(chatHistory);
        }
        // 4. Save AI Response
        const aiMessage = await prisma_1.default.message.create({
            data: {
                sessionId,
                userId,
                role: 'assistant',
                content: aiResponseText,
                hasPlanUpdate,
            },
        });
        await prisma_1.default.chatSession.update({
            where: { id: sessionId },
            data: { updatedAt: new Date() },
        });
        return {
            message: aiMessage,
            hasPlanUpdate,
        };
    }
}
exports.ChatService = ChatService;
exports.chatService = new ChatService();
//# sourceMappingURL=chat.service.js.map