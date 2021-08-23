import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/Category/createCategory/createCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/Category/import/importCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/Category/listCategory/listCategoryController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
