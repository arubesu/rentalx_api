import { Specification } from '../../../entities/Specification';
import { ISpecificationRepository } from '../../../repositories/Specification/ISpecificationRepository';

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) { }

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationUseCase };
