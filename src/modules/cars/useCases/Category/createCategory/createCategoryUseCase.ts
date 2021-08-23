import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { ICategoryRepository } from '@modules/cars/repositories/Category/ICategoryRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const existingCategory = await this.categoryRepository.findByName(name);

    if (existingCategory) {
      throw new RequestError(`Category ${name} already exists`);
    }

    this.categoryRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
