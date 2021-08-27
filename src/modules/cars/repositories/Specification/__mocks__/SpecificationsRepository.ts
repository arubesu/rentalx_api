import { Specification } from '@modules/cars/entities/Specification';

import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Specification[];

  constructor() {
    this.repository = [];
  }

  async list(): Promise<Specification[]> {
    return this.repository;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.repository.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.find(specification => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.repository.filter(specification =>
      ids.includes(specification.id),
    );
    return allSpecifications;
  }
}

export { SpecificationsRepository };
