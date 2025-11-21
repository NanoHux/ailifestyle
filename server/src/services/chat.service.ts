import prisma from '../utils/prisma';
import { aiClient } from '../ai/deepseek';
import { planningService } from './planning.service';

export class ChatService {
  async createSession(userId: number, title?: string) {
    return prisma.chatSession.create({
      data: {
        userId,
        title: title || `Chat started at ${new Date().toLocaleString()}`,
      },
    });
  }

  async getSessions(userId: number) {
    return prisma.chatSession.findMany({
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

  async getSessionMessages(sessionId: number, userId: number) {
    // Verify ownership
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new Error('Session not found or access denied');
    }

    return prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendMessage(userId: number, sessionId: number, content: string) {
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new Error('Session not found or access denied');
    }

    // 1. Save User Message
    await prisma.message.create({
      data: {
        sessionId,
        userId,
        role: 'user',
        content,
      },
    });

    // 2. Fetch Context (Last 10 messages)
    const history = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const chatHistory = history.reverse().map((m: any) => ({ role: m.role, content: m.content }));

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
    const profile = await prisma.userProfile.findUnique({ where: { userId } });
    const timezone = profile?.timezone || 'UTC';
    const todayDate = new Date().toLocaleDateString('en-CA', { timeZone: timezone });
    const todayPlan = await planningService.getDayPlan(userId, todayDate);

    if (isPlanningRequest || !todayPlan) {
      // Trigger Planning Flow
      const planResult = await planningService.generateOrUpdateDayPlan(userId, todayDate, content);
      
      aiResponseText = `I've updated your plan for today (${todayDate}).\n\n${planResult.overallAdvice}`;
      hasPlanUpdate = true;
    } else {
      // Normal Chat Flow
      aiResponseText = await aiClient.generateChatResponse(chatHistory);
    }

    // 4. Save AI Response
    const aiMessage = await prisma.message.create({
      data: {
        sessionId,
        userId,
        role: 'assistant',
        content: aiResponseText,
        hasPlanUpdate,
      },
    });

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    });

    return {
      message: aiMessage,
      hasPlanUpdate,
    };
  }
}

export const chatService = new ChatService();
