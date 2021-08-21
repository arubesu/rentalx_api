import { inject, injectable } from 'tsyringe';

import { ISpecificationRepository } from '../../../repositories/Specification/ISpecificationRepository';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) { }

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const existingSpecification = await this.specificationRepository.findByName(
      name,
    );

    if (existingSpecification) {
      throw new Error(`Specification ${name} already exists`);
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
