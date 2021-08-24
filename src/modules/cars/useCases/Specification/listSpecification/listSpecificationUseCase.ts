import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/Specification/ISpecificationsRepository';

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository ')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationUseCase };
