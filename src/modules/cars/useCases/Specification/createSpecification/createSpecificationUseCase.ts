import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { ISpecificationsRepository } from '@modules/cars/repositories/Specification/ISpecificationsRepository';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository ')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const existingSpecification =
      await this.specificationsRepository.findByName(name);

    if (existingSpecification) {
      throw new RequestError(`Specification ${name} already exists`);
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
