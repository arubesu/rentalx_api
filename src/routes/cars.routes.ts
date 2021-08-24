import { Router } from 'express';

import { ensureUserIsAdmin } from '@middlewares/ensureUserIsAdmin';
import { CreateCarController } from '@modules/cars/useCases/Car/createCar/createCarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle,
);

export { carsRoutes };
