import { Car } from '@modules/cars/entities/Car';

import { ICarsRepository, ICreateCarDTO } from '../ICarsRepository';

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
}

export { CarsRepository };