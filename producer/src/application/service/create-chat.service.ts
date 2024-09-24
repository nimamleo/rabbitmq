import { Injectable, Logger } from '@nestjs/common';
import { Chat } from '../models/chat.model';
import { AbstractRabbitmqController } from '@common/rabbitmq/abstract-rabbitmq-controller';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { tsTsxJsJsxRegex } from 'ts-loader/dist/constants';

@Injectable()
export class CreateChatService extends AbstractRabbitmqController {
  private readonly logger: Logger;
  private channelWrapper: ChannelWrapper;
  constructor() {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }

  Logger(): Logger {
    return this.logger;
  }

  client(): ChannelWrapper {
    return this.channelWrapper;
  }

  async createChat(data: Chat) {
    await this.addToQueue('chatQueue', data);
    return true;
  }

  // private readonly channleWrapper: ChannelWrapper;
  // constructor() {
  //   const connection = amqp.connect(['amqp://localhost']);
  //   this.channleWrapper = connection.createChannel({
  //     setup: (channel: Channel) =>
  //       channel.assertQueue('ChatQueue', { durable: true }),
  //   });
  // }
  // async addToQueue(data: Chat): Promise<true> {
  //   await this.channleWrapper.sendToQueue(
  //     'ChatQueue',
  //     Buffer.from(JSON.stringify(data)),
  //     {
  //       persistent: true,
  //     },
  //   );
  //   return true;
  // }
}
