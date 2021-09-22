import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/createUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatarUseCase/updateUserAvatartController';
import { UserProfileController } from '@modules/accounts/useCases/userProfileUseCase/userProfileController';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

userRoutes.post('/', createUserController.handle);

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  updateUserAvatarController.handle,
);

userRoutes.get('/profile', ensureAuthenticated, userProfileController.handle);

export { userRoutes };
