import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { CategoriesRepository } from '@modules/cars/repositories/Category/CategoriesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/Category/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/Specification/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/Specification/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
