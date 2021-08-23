import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IUpdateUserAvatarRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (user.avatar_url) {
      await deleteFile(`./tmp/avatar/${user.avatar_url}`);
    }

    user.avatar_url = avatarUrl;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
