export declare class ReflectionService {
    submitReflection(userId: number, date: string, data: {
        selfRating: number;
        userNotes: string;
    }): Promise<{
        summary: string;
        tomorrowPlanId: number;
    }>;
}
export declare const reflectionService: ReflectionService;
//# sourceMappingURL=reflection.service.d.ts.map