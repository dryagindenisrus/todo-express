import { Router } from 'express';
import { userController } from '@/controllers/user.controller';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/', userController.updateUser);
userRouter.patch('/', userController.updateUserAvatar);
userRouter.delete('/', userController.deleteUser);

export { userRouter };
