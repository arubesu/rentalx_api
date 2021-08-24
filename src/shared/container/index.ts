import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { CategoryRepository } from '@modules/cars/repositories/Category/CategoryRepository';
import { ICategoryRepository } from '@modules/cars/repositories/Category/ICategoryRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/Specification/ISpecificationRepository';
import { SpecificationRepository } from '@modules/cars/repositories/Specification/SpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
