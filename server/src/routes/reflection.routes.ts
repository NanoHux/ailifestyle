import { Router } from 'express';
import { reflectionController } from '../controllers/reflection.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.post('/finish', reflectionController.submitReflection);

export default router;
