import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureUserIsAdmin } from '@middlewares/ensureUserIsAdmin';
import { CreateCarController } from '@modules/cars/useCases/Car/createCar/createCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/Car/createCarSpecifications/createCarSpecificationsController';
import { ListAvailableCarsController } from '@modules/cars/useCases/Car/listAvailableCars/listAvailableCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/Car/uploadCarImages/uploadCarImagesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

const upload = multer(uploadConfig);

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

carsRoutes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureUserIsAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
