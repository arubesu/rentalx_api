import { Rental } from '@modules/rentals/entities/Rental';

import { ICreateRentalDTO, IRentalsRepository } from '../IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Rental[];

  constructor() {
    this.repository = [];
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.repository.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.find(rental => rental.id === id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.filter(rental => rental.user_id === user_id);
  }
}
export { RentalsRepository };
