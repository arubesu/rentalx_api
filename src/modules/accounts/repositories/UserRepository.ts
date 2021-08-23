import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { IUserRepository, ICreateUserDTO } from './IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar_url,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar_url,
    });

    await this.repository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  findById(userId: string): Promise<User> {
    return this.repository.findOne({ id: userId });
  }
}

export { UserRepository };
