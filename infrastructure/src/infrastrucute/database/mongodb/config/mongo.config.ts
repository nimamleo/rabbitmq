import { registerAs, ConfigFactory } from '@nestjs/config';
import * as process from 'node:process';

export interface IMongoConfig {
  connectionString: string;
  dbName: string;
}

export const MONGO_CONFIG_TOKEN = 'mongo-config-token';

export const mongoConfig = registerAs<
  IMongoConfig,
  ConfigFactory<IMongoConfig>
>(MONGO_CONFIG_TOKEN, () => {
  const configError: string[] = [];

  if (!process.env.MONGO_CONNECTION_STRING) {
    configError.push('MONGO_CONNECTION_STRING not provided');
  }

  if (!process.env.MONGO_DB_NAME) {
    configError.push('MONGO_DB_NAME not provided');
  }

  if (configError.length > 0) {
    throw new Error(configError.join('\n'));
  }

  return {
    connectionString: process.env.MONGO_CONNECTION_STRING,
    dbName: process.env.MONGO_DB_NAME,
  };
});
