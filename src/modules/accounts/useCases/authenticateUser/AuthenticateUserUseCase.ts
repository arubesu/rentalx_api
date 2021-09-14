import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { RequestError } from '@errors/RequestError';
import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/userTokens/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';

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
  refresh_token: string;
}

function onError() {
  throw new RequestError('email or password is incorrect', 401);
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    if (!user) {
      onError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      onError();
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_in_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: {
        name: user.name,
        email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
