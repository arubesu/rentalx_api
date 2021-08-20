import { Router } from 'express'
import { Category } from '../models/Category';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(
    category,
    {
      name,
      description,
      createdAt: new Date(),
    });

  categories.push();

  return response.status(201).json(category);
})

export { categoriesRoutes }