import { Specification } from '../../models/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from './ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationRepository };
