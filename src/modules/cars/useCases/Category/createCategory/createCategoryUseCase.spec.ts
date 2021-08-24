import { RequestError } from '@errors/RequestError';
import { CategoriesRepository } from '@modules/cars/repositories/Category/CategoriesRepository';

import { CreateCategoryUseCase } from './createCategoryUseCase';

let categoriesRepository: CategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

jest.mock('../../../repositories/Category/CategoriesRepository');

describe('Create a Category', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Dummy Category',
      description: 'Dummy Description',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const createdCategory = await categoriesRepository.findByName(category.name);

    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create duplicated category name', async () => {
    const category = {
      name: 'Dummy Category',
      description: 'Dummy Description',
    };

    expect(async () => {
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(RequestError);
  });
});
