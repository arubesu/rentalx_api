import { RequestError } from '@errors/RequestError';
import { ICreateUserDTO } from '@modules/accounts/repositories/users/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/users/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/repositories/userTokens/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/dayjsDateProvider';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';

import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let userTokensRepository: UsersTokensRepository;
let dateProvider: IDateProvider;

jest.mock('@modules/accounts/repositories/users/UsersRepository');
jest.mock('@modules/accounts/repositories/userTokens/UsersTokensRepository');

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    dateProvider = new DayjsDateProvider();
    userTokensRepository = new UsersTokensRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      userTokensRepository,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  test('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456789',
      email: 'email@mail.com',
      password: 'password',
      name: 'John doe',
    };

    await createUserUseCase.execute(user);

    const createdUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(createdUser).toHaveProperty('token');
  });

  test('Should not be able to authenticate when user does not exist', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'email@mail.com',
        password: 'password',
      }),
    ).rejects.toEqual(new RequestError('email or password is incorrect', 401));
  });

  test('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456789',
      email: 'email@mail.com',
      password: 'password',
      name: 'John doe',
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toEqual(new RequestError('email or password is incorrect', 401));
  });
});
