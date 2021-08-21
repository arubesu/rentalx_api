import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../../repositories/Category/ICategoryRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const existingCategory = await this.categoryRepository.findByName(name);

    if (existingCategory) {
      throw new Error(`Category ${name} already exists`);
    }

    this.categoryRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
