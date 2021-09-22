import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/storageProvider/IStorageProvider';
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
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    const folderName = 'avatar';
    const userAvatarUrl = user.avatar_url;

    if (userAvatarUrl) {
      await this.storageProvider.delete(userAvatarUrl, folderName);
    }

    await this.storageProvider.save(avatarUrl, folderName);

    user.avatar_url = avatarUrl;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
