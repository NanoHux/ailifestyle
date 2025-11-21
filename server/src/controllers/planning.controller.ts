import { Request, Response } from 'express';
import { planningService } from '../services/planning.service';

export class PlanningController {
  async getDayPlan(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const { date } = req.query;
      if (!date || typeof date !== 'string') {
          return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
      }

      const plan = await planningService.getDayPlan(req.user.id, date);
      res.json(plan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch day plan' });
    }
  }
}

export const planningController = new PlanningController();