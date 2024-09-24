import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppService } from './application/app.service';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

  const rabbit = await app.resolve<AppService>(AppService);
  await rabbit.consume('chatQueue');
  await app.listen();
}

bootstrap();
