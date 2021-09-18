import { UserTokens } from '@modules/accounts/entities/UserTokens';

import {
  IUsersTokensRepository,
  ICreateUserTokenDTO,
} from '../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: UserTokens[];

  constructor() {
    this.repository = [];
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.repository.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const usersTokens = this.repository.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    this.repository.slice(this.repository.findIndex(token => token.id === id));
  }

  async findByToken(token: string): Promise<UserTokens> {
    return this.repository.find(userToken => userToken.refresh_token === token);
  }
}
export { UsersTokensRepository };
