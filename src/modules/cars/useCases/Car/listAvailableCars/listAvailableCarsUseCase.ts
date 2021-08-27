import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailableByFilter({
      brand,
      category_id,
      name,
    });
    return cars;
  }
}
export { ListAvailableCarsUseCase };
