import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureUserIsAdmin } from '@middlewares/ensureUserIsAdmin';
import { CreateCarController } from '@modules/cars/useCases/Car/createCar/createCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/Car/listAvailableCars/listAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle,
);

carsRoutes.get('/', listAvailableCarsController.handle);

export { carsRoutes };
