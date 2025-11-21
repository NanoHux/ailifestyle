export declare class PlanningService {
    generateOrUpdateDayPlan(userId: number, date: string, userInput: string): Promise<{
        blocks: {
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
        }[];
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        planDate: Date;
        dayGoal: string | null;
        overallAdvice: string | null;
        status: string;
    }>;
    private combineDateAndTime;
    private normalizeDate;
    getDayPlan(userId: number, date: string): Promise<({
        blocks: {
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
        }[];
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        planDate: Date;
        dayGoal: string | null;
        overallAdvice: string | null;
        status: string;
    }) | null>;
}
export declare const planningService: PlanningService;
//# sourceMappingURL=planning.service.d.ts.map