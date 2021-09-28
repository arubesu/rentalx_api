import { container } from 'tsyringe';

import { DayjsDateProvider } from './dateProvider/dayjsDateProvider';
import { IDateProvider } from './dateProvider/IDateProvider';
import { IMailProvider } from './mailProvider/IMailProvider';
import { EtherealMailProvider } from './mailProvider/implementations/etherealMailProvider';
import { SESMailProvider } from './mailProvider/implementations/sesMailProvider';
import { LocalStorageProvider } from './storageProvider/implementations/localStorageProvider';
import { S3StorageProvider } from './storageProvider/implementations/s3StorageProvider';
import { IStorageProvider } from './storageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.STORAGE],
);
