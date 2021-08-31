import dayjs from 'dayjs';

import { RequestError } from '@errors/RequestError';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/Car/ICarsRepository';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/dayjsDateProvider';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';

import { IRentalsRepository } from '../../repositories/IRentalsRepository';
import { RentalsRepository } from '../../repositories/RentalsRepository';
import { CreateRentalUseCase } from './createRentalsUseCase';

let dayjsDateProvider: IDateProvider;
let rentalsRepository: IRentalsRepository;
let carsRepository: ICarsRepository;
let createRentalUseCase: CreateRentalUseCase;

jest.mock('../../repositories/RentalsRepository');
jest.mock('@modules/cars/repositories/Car/CarsRepository');

describe('Create Rental', () => {
  const tomorrowDateTime = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepository();
    carsRepository = new CarsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository,
    );
  });

  test('Should be able to create a new car rental', async () => {
    const car = await carsRepository.create({
      name: 'name',
      description: 'description',
      daily_rate: 250,
      license_plate: 'license_plate',
      fine_amount: 60,
      category_id: 'category_id',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: car.id,
      expected_return_date: tomorrowDateTime,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  test('Should not be able to rent a car if the user has an open rental ', async () => {
    await rentalsRepository.create({
      car_id: 'car_id',
      user_id: 'user_id',
      expected_return_date: tomorrowDateTime,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: 'another_car_id',
        expected_return_date: tomorrowDateTime,
      }),
    ).rejects.toEqual(
      new RequestError('There is already a rental for this user'),
    );
  });

  test('Should not be able to rent a car that is already rented', async () => {
    await rentalsRepository.create({
      car_id: 'car_id',
      user_id: 'user_id',
      expected_return_date: tomorrowDateTime,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: 'car_id',
        expected_return_date: tomorrowDateTime,
      }),
    ).rejects.toEqual(new RequestError('Car is unavailable'));
  });

  test('Should not be able to create a new rental with return time less than 24 hours', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: 'car_id',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(
      new RequestError('The rental period must be greater than 24 hours'),
    );
  });
});
