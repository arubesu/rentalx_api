import { ICategoryRepository } from '../../repositories/Category/ICategoryRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) { }

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
