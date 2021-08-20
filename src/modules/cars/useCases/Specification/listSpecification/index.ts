import { SpecificationRepository } from '../../../repositories/Specification/SpecificationRepository';
import { ListSpecificationController } from './listSpecificationController';
import { ListSpecificationUseCase } from './listSpecificationUseCase';

const specificationRepository = SpecificationRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(
  specificationRepository,
);
const listSpecificationController = new ListSpecificationController(
  listSpecificationUseCase,
);

export { listSpecificationController };
