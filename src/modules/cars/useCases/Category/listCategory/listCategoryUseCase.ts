import { Category } from '../../../entities/Category';
import { ICategoryRepository } from '../../../repositories/Category/ICategoryRepository';

class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoryUseCase };
