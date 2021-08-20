import { Specification } from '../../../models/Specification';
import { ISpecificationRepository } from '../../../repositories/Specification/ISpecificationRepository';

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) { }

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationUseCase };
