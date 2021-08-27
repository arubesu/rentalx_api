import { RequestError } from '@errors/RequestError';
import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/Specification/SpecificationsRepository';

import { CreateCarSpecificationUseCase } from './createCarSpecificationsUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepository;
let specificationsRepository: SpecificationsRepository;

jest.mock('@modules/cars/repositories/Specification/SpecificationsRepository');
jest.mock('@modules/cars/repositories/Car/CarsRepository');

describe('Create a Car Specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    specificationsRepository = new SpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );
  });

  test('Should be able to add specifications to a car', async () => {
    const car = await carsRepository.create({
      name: 'name',
      description: 'description',
      daily_rate: 250,
      license_plate: 'license_plate',
      fine_amount: 50,
      brand: 'brand',
      category_id: 'category_id',
    });

    const specification = await specificationsRepository.create({
      description: 'description',
      name: 'name',
    });

    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  test('Should not be able to add a new specification when car does not exists', async () => {
    const car_id = 'car_id';
    const specifications_id = ['specifications_id'];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      }),
    ).rejects.toEqual(new RequestError('Car does not exists'));
  });
});
