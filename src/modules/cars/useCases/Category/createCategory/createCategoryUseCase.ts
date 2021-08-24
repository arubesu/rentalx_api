import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { ICategoriesRepository } from '@modules/cars/repositories/Category/ICategoriesRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const existingCategory = await this.categoriesRepository.findByName(name);

    if (existingCategory) {
      throw new RequestError(`Category ${name} already exists`);
    }

    this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
