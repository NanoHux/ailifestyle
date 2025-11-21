import { Router } from 'express';
import { planningController } from '../controllers/planning.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.get('/day-plan', planningController.getDayPlan);

export default router;
