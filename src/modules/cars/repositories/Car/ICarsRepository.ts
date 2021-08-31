import { Car } from '@modules/cars/entities/Car';

export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export interface IListCarDTO {
  name?: string;
  brand?: string;
  category_id?: string;
}

export interface ICarsRepository {
  updateAvailable(car_id: string, available: boolean): Promise<void>;
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailableByFilter(filter: IListCarDTO): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
}
