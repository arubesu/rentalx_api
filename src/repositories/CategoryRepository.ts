import { Category } from '../models/Category';
import { ICategoryRepository, ICreateCategoryDTO } from './ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find(c => c.name === name);
  }
}

export { CategoryRepository };
