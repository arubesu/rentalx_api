import { container } from 'tsyringe';

import { DayjsDateProvider } from './dateProvider/dayjsDateProvider';
import { IDateProvider } from './dateProvider/IDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);
