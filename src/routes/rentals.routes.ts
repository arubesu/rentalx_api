import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRentals/createRentalsController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/returnRentalController';

const rentalsRoutes = Router();

const createRentalUseCase = new CreateRentalController();
const returnRentalUseCase = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalUseCase.handle);

rentalsRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalUseCase.handle,
);

rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalsRoutes };
