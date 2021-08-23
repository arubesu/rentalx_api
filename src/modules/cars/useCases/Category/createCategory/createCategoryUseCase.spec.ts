import { RequestError } from '@errors/RequestError';
import { CategoryRepository } from '@modules/cars/repositories/Category/CategoryRepository';

import { CreateCategoryUseCase } from './createCategoryUseCase';

let categoryRepository: CategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;

jest.mock('../../../repositories/Category/CategoryRepository');

describe('Create a Category', () => {
  beforeEach(() => {
    categoryRepository = new CategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
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

    const createdCategory = await categoryRepository.findByName(category.name);

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
