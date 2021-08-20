import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/Category/createCategory';
import { listCategoryController } from '../modules/cars/useCases/Category/listCategory';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  const categories = listCategoryController.handle(request, response);

  return response.json(categories);
});

export { categoriesRoutes };
