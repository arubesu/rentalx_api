import { getRepository, Repository } from 'typeorm';

import { Car } from '@modules/cars/entities/Car';

import { ICarsRepository, ICreateCarDTO } from './ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });

    await this.repository.save(car);

    return car;
  }
}

export { CarsRepository };
