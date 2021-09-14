import { UserTokens } from '@modules/accounts/entities/UserTokens';

export interface ICreateUserTokenDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

export interface IUsersTokensRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}
