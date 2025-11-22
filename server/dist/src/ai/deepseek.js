"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiClient = exports.DeepSeekClient = exports.ReflectionResponseSchema = exports.DayPlanResponseSchema = exports.PlanBlockSchema = void 0;
const zod_1 = require("zod");
// Define the schemas we expect from AI
exports.PlanBlockSchema = zod_1.z.object({
    start: zod_1.z.string().regex(/^\d{2}:\d{2}$/),
    end: zod_1.z.string().regex(/^\d{2}:\d{2}$/),
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    category: zod_1.z.enum(['work', 'study', 'health', 'life', 'other']).default('other'),
    priority: zod_1.z.enum(['high', 'medium', 'low']).default('medium'),
    from_previous_day_block_id: zod_1.z.number().optional().nullable(),
});
exports.DayPlanResponseSchema = zod_1.z.object({
    date: zod_1.z.string(), // YYYY-MM-DD
    day_goal: zod_1.z.string(),
    blocks: zod_1.z.array(exports.PlanBlockSchema),
    overall_advice: zod_1.z.string(),
});
exports.ReflectionResponseSchema = zod_1.z.object({
    summary: zod_1.z.string(),
    tomorrow_plan: exports.DayPlanResponseSchema,
});
class DeepSeekClient {
    constructor() {
        this.baseUrl = 'https://api.deepseek.com';
    }
    get apiKey() {
        return process.env.DEEPSEEK_API_KEY || '';
    }
    async callChatCompletion(messages, responseFormat) {
        console.log('[DeepSeek] callChatCompletion started');
        if (!this.apiKey) {
            console.error('[DeepSeek] DEEPSEEK_API_KEY is not set');
            throw new Error('DEEPSEEK_API_KEY is not set');
        }
        console.log('[DeepSeek] Sending request to:', `${this.baseUrl}/chat/completions`);
        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages,
                    temperature: 0.7,
                    response_format: { type: 'json_object' }, // DeepSeek supports JSON mode
                    max_tokens: 2000
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[DeepSeek] API Error: ${response.status} ${response.statusText} - ${errorText}`);
                throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            console.log('[DeepSeek] Response received, choices:', data.choices?.length);
            const content = data.choices[0].message.content;
            return content;
        }
        catch (error) {
            console.error('[DeepSeek] Fetch error:', error);
            throw error;
        }
    }
    async generateDayPlan(userContext, date, preferences, userInput) {
        const prompt = `
    You are an AI Life Coach and Planner.
    Help the user plan their day based on the following context:
    Date: ${date}
    User Profile: ${JSON.stringify(preferences)}
    Context: ${userContext}
    User Request: "${userInput}"
    
    Output a strictly valid JSON object matching the following structure:
    {
      "date": "YYYY-MM-DD",
      "day_goal": "Summary of the main goal",
      "blocks": [
        {
          "start": "HH:MM",
          "end": "HH:MM",
          "title": "Task Title",
          "description": "Brief description",
          "notes": "Optional notes",
          "category": "work" | "study" | "health" | "life" | "other",
          "priority": "high" | "medium" | "low"
        }
      ],
      "overall_advice": "Short piece of advice for the day"
    }
    `;
        const content = await this.callChatCompletion([
            { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
            { role: 'user', content: prompt }
        ]);
        try {
            const cleanContent = content.replace(/```json\n?|```/g, '').trim();
            console.log("[DeepSeek] Raw content:", content);
            console.log("[DeepSeek] Cleaned content:", cleanContent);
            const json = JSON.parse(cleanContent);
            // Validate with Zod
            return exports.DayPlanResponseSchema.parse(json);
        }
        catch (error) {
            console.error('Failed to parse AI response:', content);
            throw new Error('Failed to generate valid JSON plan from AI');
        }
    }
    async generateChatResponse(history) {
        if (!this.apiKey) {
            return "I'm sorry, my AI brain (API Key) is missing. Please check the server configuration.";
        }
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a helpful AI Lifestyle Assistant. You help users plan their days, track habits, and reflect on their life.' },
                    ...history
                ],
                temperature: 0.7,
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('DeepSeek Chat Error:', errorText);
            return "I'm having trouble reaching my thought centers right now. Please try again later.";
        }
        const data = await response.json();
        return data.choices[0].message.content;
    }
    async generateReflection(todayPlan, completedBlocks, userReflection) {
        const prompt = `
     Analyze the user's day for reflection.
     Original Plan: ${JSON.stringify(todayPlan)}
     Completed Blocks: ${JSON.stringify(completedBlocks)}
     User Self Rating: ${userReflection.selfRating}/5
     User Notes: "${userReflection.userNotes}"

     Generate a summary and a plan for tomorrow (assuming same preferences for now).
     Output JSON:
     {
       "summary": "Reflection summary",
       "tomorrow_plan": { ...DayPlanResponse schema... }
     }
     `;
        const content = await this.callChatCompletion([
            { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
            { role: 'user', content: prompt }
        ]);
        try {
            const cleanContent = content.replace(/```json\n?|```/g, '').trim();
            const json = JSON.parse(cleanContent);
            return exports.ReflectionResponseSchema.parse(json);
        }
        catch (error) {
            console.error('Failed to parse AI response:', content);
            throw new Error('Failed to generate valid JSON reflection from AI');
        }
    }
}
exports.DeepSeekClient = DeepSeekClient;
exports.aiClient = new DeepSeekClient();
//# sourceMappingURL=deepseek.js.map