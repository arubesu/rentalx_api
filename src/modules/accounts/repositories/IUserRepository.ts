interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

interface IUserRepository {
  create({
    name,
    driver_license,
    email,
    password,
  }: ICreateUserDTO): Promise<void>;
}

export { IUserRepository, ICreateUserDTO };
