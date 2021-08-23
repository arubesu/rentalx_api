import { User } from '@modules/accounts/entities/User';

import { ICreateUserDTO, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar_url,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
      avatar_url,
    });

    this.repository.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.find(user => user.email === email);
  }

  async findById(userId: string): Promise<User> {
    return this.repository.find(user => user.id === userId);
  }
}

export { UserRepository };
