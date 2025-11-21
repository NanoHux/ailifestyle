"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = exports.ChatController = void 0;
const chat_service_1 = require("../services/chat.service");
class ChatController {
    async getSessions(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const sessions = await chat_service_1.chatService.getSessions(req.user.id);
            res.json(sessions);
        }
        catch (error) {
            console.error('Failed to fetch sessions', error);
            res.status(500).json({ error: 'Failed to fetch sessions' });
        }
    }
    async createSession(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const { title } = req.body;
            const session = await chat_service_1.chatService.createSession(req.user.id, title);
            res.json(session);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create session' });
        }
    }
    async getMessages(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const sessionId = parseInt(req.params.id || '');
            if (isNaN(sessionId)) {
                return res.status(400).json({ error: 'Invalid session ID' });
            }
            const messages = await chat_service_1.chatService.getSessionMessages(sessionId, req.user.id);
            res.json(messages);
        }
        catch (error) {
            console.error('Failed to fetch messages', error);
            const status = error instanceof Error && error.message.includes('access denied') ? 403 : 500;
            res.status(status).json({ error: 'Failed to fetch messages' });
        }
    }
    async sendMessage(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const { sessionId, content } = req.body;
            // Ensure sessionId is valid
            if (!sessionId || !content) {
                return res.status(400).json({ error: 'sessionId and content are required' });
            }
            const result = await chat_service_1.chatService.sendMessage(req.user.id, sessionId, content);
            res.json(result);
        }
        catch (error) {
            console.error('Failed to send message', error);
            const status = error instanceof Error && error.message.includes('access denied') ? 403 : 500;
            res.status(status).json({ error: 'Failed to send message' });
        }
    }
}
exports.ChatController = ChatController;
exports.chatController = new ChatController();
//# sourceMappingURL=chat.controller.js.map