import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository';
import { deleteFile } from '@utils/file';

interface IUpdateUserAvatarRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar_url) {
      await deleteFile(`./tmp/avatar/${user.avatar_url}`);
    }

    user.avatar_url = avatarUrl;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
