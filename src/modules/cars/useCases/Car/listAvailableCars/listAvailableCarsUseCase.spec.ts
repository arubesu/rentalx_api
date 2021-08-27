import { CarsRepository } from '@modules/cars/repositories/Car/CarsRepository';

import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepository;

jest.mock('@modules/cars/repositories/Car/CarsRepository');

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  test('Should be able to list all available cars', async () => {
    const car1 = await carsRepository.create({
      name: 'Car1',
      description: 'description',
      daily_rate: 200.0,
      license_plate: 'license_plate1',
      fine_amount: 50.0,
      brand: 'brand',
      category_id: 'category',
    });

    const car2 = await carsRepository.create({
      name: 'Car2',
      description: 'description',
      daily_rate: 200.0,
      license_plate: 'license_plate2',
      fine_amount: 50.0,
      brand: 'brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: car1.id }),
        expect.objectContaining({ id: car2.id }),
      ]),
    );
  });

  test('Should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Car2',
      description: 'description',
      daily_rate: 200.0,
      license_plate: 'license_plate',
      fine_amount: 50.0,
      brand: 'dummy_brand',
      category_id: 'category',
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'dummy_brand',
    });

    expect(cars).toEqual([car]);
  });

  test('Should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'dummy_car',
      description: 'description',
      daily_rate: 200.0,
      license_plate: 'license_plate',
      fine_amount: 50.0,
      brand: 'brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'dummy_car',
    });

    expect(cars).toEqual([car]);
  });

  test('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepository.create({
      name: 'Car3',
      description: 'description',
      daily_rate: 200.0,
      license_plate: 'license_plate',
      fine_amount: 50.0,
      brand: 'brand',
      category_id: 'category',
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category',
    });

    expect(cars).toEqual([car]);
  });
});
