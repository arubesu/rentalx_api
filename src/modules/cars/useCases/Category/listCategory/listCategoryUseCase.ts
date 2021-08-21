import { inject, injectable } from 'tsyringe';

import { Category } from '../../../entities/Category';
import { ICategoryRepository } from '../../../repositories/Category/ICategoryRepository';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
