import { CategoryRepository } from '../repositories/CategoryRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) { }

  execute({ name, description }: ICreateCategoryDTO): void {
    const existingCategory = this.categoryRepository.findByName(name);

    if (existingCategory) {
      throw new Error(`Category ${name} already exists`);
    }

    this.categoryRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryService };
