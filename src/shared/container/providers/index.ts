import { container } from 'tsyringe';

import { DayjsDateProvider } from './dateProvider/dayjsDateProvider';
import { IDateProvider } from './dateProvider/IDateProvider';
import { IMailProvider } from './mailProvider/IMailProvider';
import { EtherealMailProvider } from './mailProvider/implementations/etherealMailProvider';
import { LocalStorageProvider } from './Storage/implementations/localStorageProvider';
import { IStorageProvider } from './Storage/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
);
