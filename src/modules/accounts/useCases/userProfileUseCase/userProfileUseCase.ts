import { injectable, inject } from 'tsyringe';

import { UserMap } from '@modules/accounts/mapper/userMap';
import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository';

interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  driver_license: string;
  avatar_url: string;
  avatar_public_url(): string;
}

@injectable()
class UserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase, IUserResponseDTO };
