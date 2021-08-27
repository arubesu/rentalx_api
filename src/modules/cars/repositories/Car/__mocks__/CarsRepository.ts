import { Car } from '@modules/cars/entities/Car';

import {
  ICarsRepository,
  ICreateCarDTO,
  IListCarDTO,
} from '../ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Car[];
  constructor() {
    this.repository = [];
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
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.repository.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.find(car => car.license_plate === license_plate);
  }

  async findAvailableByFilter({
    name,
    brand,
    category_id,
  }: IListCarDTO): Promise<Car[]> {
    return this.repository.filter(car => {
      if (!car.available) {
        return null;
      }

      if (!name && !category_id && !brand) {
        return car;
      }

      if (
        (name && car.name === name) ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand)
      ) {
        return car;
      }

      return null;
    });
  }
}

export { CarsRepository };
