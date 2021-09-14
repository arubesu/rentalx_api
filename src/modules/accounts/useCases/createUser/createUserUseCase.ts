import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import {
  IUsersRepository,
  ICreateUserDTO,
} from '@modules/accounts/repositories/users/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new RequestError('User already exists!');
    }

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
