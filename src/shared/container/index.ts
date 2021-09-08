import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { CarImagesRepository } from '@modules/cars/repositories/Car/CarImagesRepository';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';
import ICarsImagesRepository from '@modules/cars/repositories/Car/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { CategoriesRepository } from '@modules/cars/repositories/Category/CategoriesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/Category/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/Specification/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/Specification/SpecificationsRepository';
import { IRentalsRepository } from '@modules/rentals/entities/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/entities/repositories/RentalsRepository';

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

container.registerSingleton<ICarsImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
