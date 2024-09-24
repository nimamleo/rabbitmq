import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CHAT_RABBITMQ_QUEUE } from '../../../common/rabbitmq/chat-queue.model';
import { CreateChatService } from './service/create-chat.service';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: CHAT_RABBITMQ_QUEUE,
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'queue1',
    //     },
    //   },
    // ]),
  ],
  providers: [CreateChatService],
  exports: [CreateChatService],
})
export class ProducerModule {}
