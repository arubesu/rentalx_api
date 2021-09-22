import { container } from 'tsyringe';

import { DayjsDateProvider } from './dateProvider/dayjsDateProvider';
import { IDateProvider } from './dateProvider/IDateProvider';
import { IMailProvider } from './mailProvider/IMailProvider';
import { EtherealMailProvider } from './mailProvider/implementations/etherealMailProvider';
import { LocalStorageProvider } from './storageProvider/implementations/localStorageProvider';
import { S3StorageProvider } from './storageProvider/implementations/s3StorageProvider';
import { IStorageProvider } from './storageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.STORAGE],
);
