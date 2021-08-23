import { container } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { UserRepository } from '@modules/accounts/repositories/UserRepository';
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

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
