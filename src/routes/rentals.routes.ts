import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRentals/createRentalsController';

const rentalsRoutes = Router();

const createRentalUseCase = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalUseCase.handle);

export { rentalsRoutes };
