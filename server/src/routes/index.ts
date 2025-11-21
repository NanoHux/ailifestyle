import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import planningRoutes from './planning.routes';
import trackingRoutes from './tracking.routes';
import reflectionRoutes from './reflection.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Root' });
});

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/planning', planningRoutes);
router.use('/tracking', trackingRoutes);
router.use('/reflection', reflectionRoutes);

export default router;