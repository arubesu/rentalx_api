import { CategoryRepository } from '../../../repositories/Category/CategoryRepository';
import { ListCategoryController } from './listCategoryController';
import { ListCategoryUseCase } from './listCategoryUseCase';

const categoryRepository = CategoryRepository.getInstance();
const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };
