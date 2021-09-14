import { Repository, getRepository } from 'typeorm';

import { UserTokens } from '@modules/accounts/entities/UserTokens';

import {
  IUsersTokensRepository,
  ICreateUserTokenDTO,
} from './IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });
    await this.repository.save(userToken);
    return userToken;
  }
}
export { UsersTokensRepository };
