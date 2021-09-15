import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { RequestError } from '@errors/RequestError';
import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/userTokens/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/mailProvider/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new RequestError('User does not exists!');
    }

    const reset_token = v4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: reset_token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      email: user.email,
      expiration: new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(expires_date),
      url: `${process.env.FORGOT_PASSWORD_URL}?token=${reset_token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Password recovery',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
