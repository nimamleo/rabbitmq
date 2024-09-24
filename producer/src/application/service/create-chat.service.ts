import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Chat } from '../models/chat.model';
import { CHAT_RABBITMQ_QUEUE } from '../../../../common/rabbitmq/chat-queue.model';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class CreateChatService {
  private readonly channleWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channleWrapper = connection.createChannel({
      setup: (channel: Channel) =>
        channel.assertQueue('ChatQueue', { durable: true }),
    });
  }

  async addToQueue(data: Chat): Promise<true> {
    await this.channleWrapper.sendToQueue(
      'ChatQueue',
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true,
      },
    );
    return true;
  }
}
