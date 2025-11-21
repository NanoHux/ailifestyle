import { z } from 'zod';

// Define the schemas we expect from AI

export const PlanBlockSchema = z.object({
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/),
  title: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
  category: z.enum(['work', 'study', 'health', 'life', 'other']).default('other'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  from_previous_day_block_id: z.number().optional().nullable(),
});

export const DayPlanResponseSchema = z.object({
  date: z.string(), // YYYY-MM-DD
  day_goal: z.string(),
  blocks: z.array(PlanBlockSchema),
  overall_advice: z.string(),
});

export const ReflectionResponseSchema = z.object({
  summary: z.string(),
  tomorrow_plan: DayPlanResponseSchema,
});

export type DayPlanResponse = z.infer<typeof DayPlanResponseSchema>;
export type ReflectionResponse = z.infer<typeof ReflectionResponseSchema>;

export class DeepSeekClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    this.baseUrl = 'https://api.deepseek.com';
  }

  private async callChatCompletion(messages: any[], responseFormat?: any) {
    if (!this.apiKey) {
      throw new Error('DEEPSEEK_API_KEY is not set');
    }

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
        throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json() as any;
    const content = data.choices[0].message.content;
    return content;
  }

  async generateDayPlan(
    userContext: string,
    date: string,
    preferences: any,
    userInput: string
  ): Promise<DayPlanResponse> {
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
        const json = JSON.parse(cleanContent);
        // Validate with Zod
        return DayPlanResponseSchema.parse(json);
    } catch (error) {
        console.error('Failed to parse AI response:', content);
        throw new Error('Failed to generate valid JSON plan from AI');
    }
  }

  async generateChatResponse(history: { role: string; content: string }[]): Promise<string> {
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
  
      const data = await response.json() as any;
      return data.choices[0].message.content;
  }
  
  async generateReflection(
    todayPlan: any,
    completedBlocks: any[],
    userReflection: { selfRating: number; userNotes: string }
  ): Promise<ReflectionResponse> {
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
        return ReflectionResponseSchema.parse(json);
    } catch (error) {
        console.error('Failed to parse AI response:', content);
        throw new Error('Failed to generate valid JSON reflection from AI');
    }
  }
}

export const aiClient = new DeepSeekClient();