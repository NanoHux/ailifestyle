export declare class ChatService {
    createSession(userId: number, title?: string): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        relatedDate: Date | null;
    }>;
    getSessions(userId: number): Promise<({
        messages: {
            id: number;
            userId: number;
            createdAt: Date;
            sessionId: number;
            role: string;
            content: string;
            aiRawPayload: string | null;
            hasPlanUpdate: boolean;
        }[];
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        relatedDate: Date | null;
    })[]>;
    getSessionMessages(sessionId: number, userId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        sessionId: number;
        role: string;
        content: string;
        aiRawPayload: string | null;
        hasPlanUpdate: boolean;
    }[]>;
    sendMessage(userId: number, sessionId: number, content: string): Promise<{
        message: {
            id: number;
            userId: number;
            createdAt: Date;
            sessionId: number;
            role: string;
            content: string;
            aiRawPayload: string | null;
            hasPlanUpdate: boolean;
        };
        hasPlanUpdate: boolean;
    }>;
}
export declare const chatService: ChatService;
//# sourceMappingURL=chat.service.d.ts.map