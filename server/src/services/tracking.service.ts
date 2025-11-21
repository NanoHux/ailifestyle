import prisma from '../utils/prisma';

export class TrackingService {
  async updateBlockStatus(blockId: number, userId: number, status: string) {
    // Verify ownership via DayPlan
    const block = await prisma.planBlock.findUnique({
      where: { id: blockId },
      include: { dayPlan: true }
    });

    if (!block || block.dayPlan.userId !== userId) {
      throw new Error('Block not found or access denied');
    }

    const updatedBlock = await prisma.planBlock.update({
      where: { id: blockId },
      data: { status }
    });
    
    return updatedBlock;
  }
}

export const trackingService = new TrackingService();