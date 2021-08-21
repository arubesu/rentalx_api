import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/Specification/createSpecification/createSpecificationController';
import { ListSpecificationController } from '../modules/cars/useCases/Specification/listSpecification/listSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post('/', createSpecificationController.handle);

specificationRoutes.get('/', listSpecificationController.handle);

export { specificationRoutes };
