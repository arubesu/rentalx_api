import { Router } from 'express'
import { CategoryRepository } from '../repositories/CategoryRepository';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const repository = new CategoryRepository();

  repository.create({
    name,
    description,
  });

  return response.status(201).send();
})

export { categoriesRoutes }
