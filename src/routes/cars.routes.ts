import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureUserIsAdmin } from '@middlewares/ensureUserIsAdmin';
import { CreateCarController } from '@modules/cars/useCases/Car/createCar/createCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/Car/createCarSpecifications/createCarSpecificationsController';
import { ListAvailableCarsController } from '@modules/cars/useCases/Car/listAvailableCars/listAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle,
);

carsRoutes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.get('/', listAvailableCarsController.handle);

export { carsRoutes };
