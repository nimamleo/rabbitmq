import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { EmailService } from './application/email.service';
import { DailySaleReport } from '@common/streams/queue/daily-sale-report.model';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

  const rabbit = await app.resolve<EmailService>(EmailService);
  await rabbit.consumeQueue(DailySaleReport);

  await app.listen();
}

bootstrap();
