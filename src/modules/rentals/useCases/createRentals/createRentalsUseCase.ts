import { injectable, inject } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { Rental } from '@modules/rentals/entities/Rental';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';

import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const rentalMinimumPeriodInHours = 24;

    const currentCarRent = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (currentCarRent) {
      throw new RequestError('Car is unavailable');
    }

    const openRentalUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (openRentalUser) {
      throw new RequestError('There is already a rental for this user');
    }

    const dateNow = this.dateProvider.dateNow();
    const diferenceHoursFromExpected = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (diferenceHoursFromExpected < rentalMinimumPeriodInHours) {
      throw new RequestError('The rental period must be greater than 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }
}

export { CreateRentalUseCase };
