import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationRepository } from '@modules/cars/repositories/Specification/ISpecificationRepository';

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationUseCase };
