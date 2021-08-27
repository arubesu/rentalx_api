import { getRepository, Repository } from 'typeorm';

import { Car } from '@modules/cars/entities/Car';

import { ICarsRepository, ICreateCarDTO, IListCarDTO } from './ICarsRepository';

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
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({
      license_plate,
    });
  }

  async findAvailableByFilter({
    name,
    brand,
    category_id,
  }: IListCarDTO): Promise<Car[]> {
    const query = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      query.andWhere('c.brand = :brand', { brand });
    }
    if (name) {
      query.andWhere('c.name = :name', { name });
    }
    if (category_id) {
      query.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await query.getMany();

    return cars;
  }
}

export { CarsRepository };
