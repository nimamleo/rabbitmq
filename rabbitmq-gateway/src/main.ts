import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CHAT_RABBITMQ_QUEUE } from '../../common/rabbitmq/chat-queue.model';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {
        name: CHAT_RABBITMQ_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'queue1',
        },
      },
    },
  );
  await app.listen();
}

bootstrap();
