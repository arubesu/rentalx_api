import { Car } from '@modules/cars/entities/Car';

export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  id?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
}
