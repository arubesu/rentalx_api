import { ISpecificationRepository } from '../../repositories/Specification/ISpecificationRepository';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) { }

  execute({ name, description }: ICreateSpecificationDTO): void {
    const existingSpecification = this.specificationRepository.findByName(name);

    if (existingSpecification) {
      throw new Error(`Specification ${name} already exists`);
    }

    this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
