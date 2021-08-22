import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { sessionRoutes } from './sessions.routes';
import { specificationRoutes } from './specifications.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);

export { router };
