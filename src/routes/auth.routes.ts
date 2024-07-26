import { Router } from 'express';
import { authController } from '@/controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', authController.registration);

export { authRouter };
