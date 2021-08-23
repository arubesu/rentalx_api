import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/entities/Category';
import { ICategoryRepository } from '@modules/cars/repositories/Category/ICategoryRepository';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
