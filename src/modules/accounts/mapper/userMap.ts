import { classToClass } from 'class-transformer';

import { User } from '../entities/User';
import { IUserResponseDTO } from '../useCases/userProfileUseCase/userProfileUseCase';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    driver_license,
    avatar_url,
    avatar_public_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      driver_license,
      avatar_url,
      avatar_public_url,
    });

    return user;
  }
}

export { UserMap };
