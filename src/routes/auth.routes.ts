import { Router } from 'express';
import { authController } from '@/controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export { authRouter };
