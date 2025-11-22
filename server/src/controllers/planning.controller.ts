import { Request, Response } from 'express';
import { planningService } from '../services/planning.service';

export class PlanningController {
  async getDayPlan(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const { date, includeArchived } = req.query;
      if (!date || typeof date !== 'string') {
          return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
      }

      const includeArchivedBool = includeArchived === 'true' || includeArchived === true;
      const plan = await planningService.getDayPlan(req.user.id, date, includeArchivedBool);
      res.json(plan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch day plan' });
    }
  }
}

export const planningController = new PlanningController();
