import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_rentalx'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentalx_test'
          : defaultOptions.database,
    }),
  );
};
