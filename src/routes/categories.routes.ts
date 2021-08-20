import { Router } from 'express'
import { CategoryRepository } from '../repositories/CategoryRepository';

const categoriesRoutes = Router();
const repository = new CategoryRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;


  repository.create({
    name,
    description,
  });

  return response.status(201).send();
})

categoriesRoutes.get('/', (request, response) => {

  const categories = repository.list();

  return response.json(categories);
})

export { categoriesRoutes }
