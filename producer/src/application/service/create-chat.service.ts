import { Injectable, Logger } from '@nestjs/common';
import { Chat } from '../models/chat.model';
import { AbstractRabbitmqController } from '@common/rabbitmq/abstract-rabbitmq-controller';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Streams } from '@common/rabbitmq/streams.interface';
import { ChatReq } from '@common/rabbitmq/models/chat.model';

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

  streams(): Streams[] {
    return [];
  }

  async createChat(data: Chat) {
    const target = new ChatReq({ content: data.content });

    await this.addToQueue('chatQueue', {
      name: target.streamKey(),
      value: target,
    });
    return true;
  }
}
