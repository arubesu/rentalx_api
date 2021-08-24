import { User } from '../entities/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar_url?: string;
}

interface IUsersRepository {
  create({
    name,
    driver_license,
    email,
    password,
    id,
    avatar_url,
  }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
