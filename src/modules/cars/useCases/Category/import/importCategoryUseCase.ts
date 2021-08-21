import csvParse from 'csv-parse';
import fs from 'fs';

import { ICategoryRepository } from '../../../repositories/Category/ICategoryRepository';

type CategoryData = {
  name: string;
  description: string;
};

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  loadCategories(file: Express.Multer.File): Promise<CategoryData[]> {
    return new Promise((resolve, reject) => {
      const categories: CategoryData[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;
      const existingCategory = this.categoryRepository.findByName(name);

      if (!existingCategory) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
