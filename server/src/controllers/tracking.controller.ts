import { Request, Response } from 'express';
import { trackingService } from '../services/tracking.service';

export class TrackingController {
  async updateBlockStatus(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const blockId = parseInt(req.params.id || '');
      const { status } = req.body;

      if (isNaN(blockId) || !status) {
          return res.status(400).json({ error: 'Invalid block ID or status' });
      }

      const updatedBlock = await trackingService.updateBlockStatus(blockId, req.user.id, status);
      res.json(updatedBlock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update block status' });
    }
  }
}

export const trackingController = new TrackingController();