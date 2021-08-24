import { RequestError } from '@errors/RequestError';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';

import { CreateCarUseCase } from './createCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepository;

jest.mock('@modules/cars/repositories/Car/CarsRepository');

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  test('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'plate',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category_id',
    });

    expect(car).toHaveProperty('id');
  });

  test('Should not be able to create a car with the same license plate', async () => {
    await createCarUseCase.execute({
      name: 'name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'plate',
      fine_amount: 50,
      brand: 'brand',
      category_id: 'category_id',
    });
    await expect(
      createCarUseCase.execute({
        name: 'name',
        description: 'description',
        daily_rate: 100,
        license_plate: 'plate',
        fine_amount: 50,
        brand: 'brand',
        category_id: 'category_id',
      }),
    ).rejects.toEqual(new RequestError('car already registered'));
  });
});
