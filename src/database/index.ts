import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_rentalx'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  console.log(defaultOptions);

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentalx_test'
          : defaultOptions.database,
    }),
  );
};
