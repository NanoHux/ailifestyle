import { Request, Response } from 'express';
import { reflectionService } from '../services/reflection.service';

export class ReflectionController {
  async submitReflection(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const { date, selfRating, userNotes } = req.body;

      if (!date || typeof selfRating !== 'number') {
          return res.status(400).json({ error: 'Date and selfRating are required' });
      }

      const result = await reflectionService.submitReflection(req.user.id, date, {
          selfRating,
          userNotes: userNotes || ''
      });

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit reflection' });
    }
  }
}

export const reflectionController = new ReflectionController();