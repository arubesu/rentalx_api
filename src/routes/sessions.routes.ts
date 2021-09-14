import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/refreshTokenController';

const sessionRoutes = Router();

const sessionsController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

sessionRoutes.post('/', sessionsController.handle);
sessionRoutes.post('/refresh_token', refreshTokenController.handle);

export { sessionRoutes };
