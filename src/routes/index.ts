import { Router } from 'express';

import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './passwords.routes';
import { rentalsRoutes } from './rentals.routes';
import { sessionRoutes } from './sessions.routes';
import { specificationRoutes } from './specifications.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/cars', carsRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/passwords', passwordRoutes);

export { router };
