import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/users/UsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/userTokens/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/repositories/userTokens/UsersTokensRepository';
import { CarImagesRepository } from '@modules/cars/repositories/Car/CarImagesRepository';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';
import ICarsImagesRepository from '@modules/cars/repositories/Car/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { CategoriesRepository } from '@modules/cars/repositories/Category/CategoriesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/Category/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/Specification/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/Specification/SpecificationsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/repositories/RentalsRepository';

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

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
