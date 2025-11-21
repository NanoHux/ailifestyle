export declare class TrackingService {
    updateBlockStatus(blockId: number, userId: number, status: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        notes: string | null;
        category: string | null;
        priority: string | null;
        status: string;
        dayPlanId: number;
        startTime: Date;
        endTime: Date;
        aiBlockId: string | null;
        fromPreviousBlockId: number | null;
    }>;
}
export declare const trackingService: TrackingService;
//# sourceMappingURL=tracking.service.d.ts.map