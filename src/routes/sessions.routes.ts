import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const sessionRoutes = Router();
const sessionsController = new AuthenticateUserController();
sessionRoutes.post('/', sessionsController.handle);

export { sessionRoutes };
