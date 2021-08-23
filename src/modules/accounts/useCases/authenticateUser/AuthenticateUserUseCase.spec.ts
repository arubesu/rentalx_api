import { RequestError } from '../../../../errors/RequestError';
import { ICreateUserDTO } from '../../repositories/IUserRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;

jest.mock('../../repositories/UserRepository');

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
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
