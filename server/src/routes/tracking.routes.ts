import { Router } from 'express';
import { trackingController } from '../controllers/tracking.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.patch('/plan-block/:id', trackingController.updateBlockStatus);

export default router;
