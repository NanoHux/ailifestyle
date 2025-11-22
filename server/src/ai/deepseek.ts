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
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.deepseek.com';
  }

  private get apiKey(): string {
    return process.env.DEEPSEEK_API_KEY || '';
  }

  private async callChatCompletion(messages: any[], responseFormat?: any) {
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
          response_format: responseFormat ?? { type: 'json_object' }, // DeepSeek supports JSON mode
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[DeepSeek] API Error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = (await response.json()) as any;
      console.log('[DeepSeek] Response received, choices:', data.choices?.length);
      const content = data.choices[0].message.content;
      return content;
    } catch (error) {
      console.error('[DeepSeek] Fetch error:', error);
      throw error;
    }
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
    
    Output a strictly valid JSON object matching the following structure (Output content uses the same language as input):
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
      { role: 'user', content: prompt },
    ]);

    try {
      const cleanContent = content.replace(/```json\n?|```/g, '').trim();
      console.log('[DeepSeek] Raw content:', content);
      console.log('[DeepSeek] Cleaned content:', cleanContent);
      const json = JSON.parse(cleanContent);
      // Validate with Zod
      return DayPlanResponseSchema.parse(json);
    } catch (error) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to generate valid JSON plan from AI');
    }
  }

  async determineIntent(
    history: { role: string; content: string }[]
  ): Promise<{ intent: 'plan' | 'chat' | 'summary'; reason: string; confidence: number }> {
    console.log('[DeepSeek] determineIntent started');
    if (!this.apiKey) {
      console.error('[DeepSeek] DEEPSEEK_API_KEY is not set in determineIntent');
      return { intent: 'chat', reason: 'Missing API key, defaulting to chat', confidence: 0 };
    }

    const latestUserMessage =
      [...history].reverse().find((m) => m.role === 'user') ?? history[history.length - 1];

    const prompt = `
      You are a router that classifies the user's latest request.
      Decide whether the assistant should:
      - "plan": create/update a day plan or schedule.
      - "summary": provide a recap/summary of the conversation or content.
      - "chat": engage in normal conversation/advice without planning.

      Consider conversation history and be concise.
      Respond ONLY in JSON:
      {
        "intent": "plan" | "chat" | "summary",
        "reason": "short reasoning in English or Chinese",
        "confidence": 0.0-1.0
      }

      Conversation history: ${JSON.stringify(history)}
      Latest user message: "${latestUserMessage?.content ?? ''}"
    `;

    try {
      const content = await this.callChatCompletion(
        [
          { role: 'system', content: 'You classify user intent for routing. Output strict JSON only.' },
          { role: 'user', content: prompt },
        ],
        { type: 'json_object' }
      );

      const cleanContent = content.replace(/```json\n?|```/g, '').trim();
      const parsed = JSON.parse(cleanContent);
      if (parsed.intent !== 'plan' && parsed.intent !== 'chat' && parsed.intent !== 'summary') {
        throw new Error(`Unexpected intent value: ${parsed.intent}`);
      }
      return {
        intent: parsed.intent,
        reason: parsed.reason ?? 'No reason provided',
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0,
      };
    } catch (error) {
      console.error('[DeepSeek] determineIntent failed, defaulting to chat:', error);
      return { intent: 'chat', reason: 'Fallback on error', confidence: 0 };
    }
  }

  async generateChatResponse(
    history: { role: string; content: string }[],
    mode: 'chat' | 'summary' = 'chat'
  ): Promise<string> {
    console.log('[DeepSeek] generateChatResponse started');
    if (!this.apiKey) {
        console.error('[DeepSeek] DEEPSEEK_API_KEY is not set in generateChatResponse');
        return "I'm sorry, my AI brain (API Key) is missing. Please check the server configuration.";
    }

    console.log('[DeepSeek] Sending chat request to API...');
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content:
                mode === 'summary'
                  ? 'You are a helpful AI that provides concise summaries and actionable next steps based on the conversation. Keep it short. (Output content uses the same language as input.)'
                  : 'You are a helpful AI Lifestyle Assistant. You help users plan their days, track habits, and reflect on their life. (Output content uses the same language as input.)',
            },
            ...history,
          ],
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
          const errorText = await response.text();
          console.error('[DeepSeek] Chat Error:', errorText);
          return "I'm having trouble reaching my thought centers right now. Please try again later.";
      }
  
      const data = await response.json() as any;
      console.log('[DeepSeek] Chat response received');
      return data.choices[0].message.content;
  }
  
  async generateReflection(
    todayPlan: any,
    completedBlocks: any[],
    userReflection: { selfRating: number; userNotes: string }
  ): Promise<ReflectionResponse> {
     const prompt = `
     Analyze the user's day for reflection. (Output content uses the same language as input.)
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
        { role: 'user', content: prompt },
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
