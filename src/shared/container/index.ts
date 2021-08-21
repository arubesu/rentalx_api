import { container } from 'tsyringe';

import { CategoryRepository } from '../../modules/cars/repositories/Category/CategoryRepository';
import { ICategoryRepository } from '../../modules/cars/repositories/Category/ICategoryRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
