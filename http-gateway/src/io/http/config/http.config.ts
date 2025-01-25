import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IHttpConfig {
  port: number;
}

export const HTTP_CONFIG_TOKEN = 'http-config-token';

export const httpConfig = registerAs<IHttpConfig, ConfigFactory<IHttpConfig>>(
  HTTP_CONFIG_TOKEN,
  () => {
    if (isNaN(Number(process.env.HTTP_PORT))) {
      throw new Error('HTTP_PORT env is not provided');
    }

    return {
      port: Number(process.env.HTTP_PORT),
    };
  },
);
