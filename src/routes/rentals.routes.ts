import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRentals/createRentalsController';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/returnRentalController';

const rentalsRoutes = Router();

const createRentalUseCase = new CreateRentalController();
const returnRentalUseCase = new ReturnRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalUseCase.handle);

rentalsRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalUseCase.handle,
);

export { rentalsRoutes };
