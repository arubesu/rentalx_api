import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { Rental } from '@modules/rentals/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';

interface IRequest {
  rentals_id: string;
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ rentals_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rentals_id);
    const minimumDaily = 1;
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new RequestError('This rental has not been found.');
    }

    const now = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, now);

    const delayedDays = this.dateProvider.compareInDays(
      now,
      rental.expected_return_date,
    );

    if (daily < minimumDaily) {
      daily = minimumDaily;
    }

    let totalRent = 0;

    if (delayedDays > 0) {
      const penaltyAmount = delayedDays * car.fine_amount;
      totalRent += penaltyAmount;
    }

    const totalDaily = daily * car.daily_rate;
    totalRent += totalDaily;

    rental.end_date = now;
    rental.total = totalRent;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { ReturnRentalUseCase };
