import { v4 as uuidv4 } from 'uuid';

import { Category } from '../../../entities/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private repository: Category[];

  constructor() {
    this.repository = [];
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    this.repository.push({
      name,
      description,
      id: uuidv4(),
      created_at: new Date(),
    });
  }

  async list(): Promise<Category[]> {
    return this.repository;
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.find(category => category.name === name);
  }
}

export { CategoryRepository };
