import { Router } from 'express';

import { SpecificationRepository } from '../modules/cars/repositories/Specification/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/Specification/createSpecificationService';

const specificationRoutes = Router();

const repository = new SpecificationRepository();
const createSpecificationService = new CreateSpecificationService(repository);

specificationRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationRoutes.get('/', (request, response) => {
  const specifications = repository.list();

  return response.json(specifications);
});

export { specificationRoutes };
