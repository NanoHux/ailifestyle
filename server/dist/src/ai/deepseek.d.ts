import { z } from 'zod';
export declare const PlanBlockSchema: z.ZodObject<{
    start: z.ZodString;
    end: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    category: z.ZodDefault<z.ZodEnum<{
        work: "work";
        study: "study";
        health: "health";
        life: "life";
        other: "other";
    }>>;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>>;
    from_previous_day_block_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const DayPlanResponseSchema: z.ZodObject<{
    date: z.ZodString;
    day_goal: z.ZodString;
    blocks: z.ZodArray<z.ZodObject<{
        start: z.ZodString;
        end: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        category: z.ZodDefault<z.ZodEnum<{
            work: "work";
            study: "study";
            health: "health";
            life: "life";
            other: "other";
        }>>;
        priority: z.ZodDefault<z.ZodEnum<{
            high: "high";
            medium: "medium";
            low: "low";
        }>>;
        from_previous_day_block_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    overall_advice: z.ZodString;
}, z.core.$strip>;
export declare const ReflectionResponseSchema: z.ZodObject<{
    summary: z.ZodString;
    tomorrow_plan: z.ZodObject<{
        date: z.ZodString;
        day_goal: z.ZodString;
        blocks: z.ZodArray<z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            title: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            notes: z.ZodOptional<z.ZodString>;
            category: z.ZodDefault<z.ZodEnum<{
                work: "work";
                study: "study";
                health: "health";
                life: "life";
                other: "other";
            }>>;
            priority: z.ZodDefault<z.ZodEnum<{
                high: "high";
                medium: "medium";
                low: "low";
            }>>;
            from_previous_day_block_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
        overall_advice: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type DayPlanResponse = z.infer<typeof DayPlanResponseSchema>;
export type ReflectionResponse = z.infer<typeof ReflectionResponseSchema>;
export declare class DeepSeekClient {
    private apiKey;
    private baseUrl;
    constructor();
    private callChatCompletion;
    generateDayPlan(userContext: string, date: string, preferences: any, userInput: string): Promise<DayPlanResponse>;
    generateChatResponse(history: {
        role: string;
        content: string;
    }[]): Promise<string>;
    generateReflection(todayPlan: any, completedBlocks: any[], userReflection: {
        selfRating: number;
        userNotes: string;
    }): Promise<ReflectionResponse>;
}
export declare const aiClient: DeepSeekClient;
//# sourceMappingURL=deepseek.d.ts.map