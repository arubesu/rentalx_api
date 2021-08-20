import { Router } from 'express'
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CreateCategoryService } from '../services/createCategoryService';

const categoriesRoutes = Router();
const repository = new CategoryRepository();
const createCategoryService = new CreateCategoryService(repository);

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  createCategoryService.execute({ name, description, });

  return response.status(201).send();
})

categoriesRoutes.get('/', (request, response) => {

  const categories = repository.list();

  return response.json(categories);
})

export { categoriesRoutes }
