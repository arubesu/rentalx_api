import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { RequestError } from '@errors/RequestError';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

function onError() {
  throw new RequestError('email or password is incorrect', 401);
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      onError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      onError();
    }

    const token = sign({}, 'cf2312457bba63e1fba504f5df99671f30fce75d', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
