import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HTTP_CONFIG_TOKEN,
  httpConfig,
  IHttpConfig,
} from './io/http/config/http.config';

async function loadConfig(): Promise<ConfigService> {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [httpConfig],
    }),
  );

  return appContext.get<ConfigService>(ConfigService);
}

async function bootstrap() {
  const configService = await loadConfig();
  const logger = new Logger('APP');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const httpConfig = configService.get<IHttpConfig>(HTTP_CONFIG_TOKEN);
  logger.debug('app is running on port 3020');
  await app.listen(httpConfig.port);
}

bootstrap();
