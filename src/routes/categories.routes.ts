import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/Category/createCategory/createCategoryController';
import { importCategoryController } from '../modules/cars/useCases/Category/import';
import { listCategoryController } from '../modules/cars/useCases/Category/listCategory';

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
