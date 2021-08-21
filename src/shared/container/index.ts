import { container } from 'tsyringe';

import { CategoryRepository } from '../../modules/cars/repositories/Category/CategoryRepository';
import { ICategoryRepository } from '../../modules/cars/repositories/Category/ICategoryRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/Specification/ISpecificationRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/Specification/SpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);
