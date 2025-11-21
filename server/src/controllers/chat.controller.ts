import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

export class ChatController {
  async getSessions(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const sessions = await chatService.getSessions(req.user.id);
      res.json(sessions);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
      res.status(500).json({ error: 'Failed to fetch sessions' });
    }
  }

  async createSession(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const { title } = req.body;
      const session = await chatService.createSession(req.user.id, title);
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create session' });
    }
  }

  async getMessages(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const sessionId = parseInt(req.params.id || '');
      if (isNaN(sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' });
      }
      const messages = await chatService.getSessionMessages(sessionId, req.user.id);
      res.json(messages);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      const status = error instanceof Error && error.message.includes('access denied') ? 403 : 500;
      res.status(status).json({ error: 'Failed to fetch messages' });
    }
  }

  async sendMessage(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const { sessionId, content } = req.body;
      
      // Ensure sessionId is valid
      if (!sessionId || !content) {
          return res.status(400).json({ error: 'sessionId and content are required' });
      }

      const result = await chatService.sendMessage(req.user.id, sessionId, content);
      res.json(result);
    } catch (error) {
      console.error('Failed to send message', error);
      const status = error instanceof Error && error.message.includes('access denied') ? 403 : 500;
      res.status(status).json({ error: 'Failed to send message' });
    }
  }
}

export const chatController = new ChatController();
