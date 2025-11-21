import { Request, Response } from 'express';
export declare class ChatController {
    getSessions(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createSession(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getMessages(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    sendMessage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const chatController: ChatController;
//# sourceMappingURL=chat.controller.d.ts.map