import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import {
  ICreateUserDTO,
  IUserRepository,
} from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists!');
    }

    this.userRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
