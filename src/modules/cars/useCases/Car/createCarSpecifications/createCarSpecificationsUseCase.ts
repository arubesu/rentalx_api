import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { Car } from '@modules/cars/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/Specification/ISpecificationsRepository';

interface ICreateCarSpecificationRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
  }
  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new RequestError('Car does not exists');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}
export { CreateCarSpecificationUseCase };
