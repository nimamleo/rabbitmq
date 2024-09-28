import { Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { AbstractRabbitmqController } from '@common/rabbitmq/abstract-rabbitmq-controller';
import { Streams } from '@common/rabbitmq/streams.interface';
import { ChatReq } from '@common/rabbitmq/models/chat.model';
import { Message } from '@common/rabbitmq/models/message.model';

@Injectable()
export class AppService extends AbstractRabbitmqController {
  private channelWrapper: ChannelWrapper;

  constructor() {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }

  client(): ChannelWrapper {
    return this.channelWrapper;
  }

  Logger(): Logger {
    return new Logger();
  }

  streams(): Streams[] {
    return [
      {
        name: new ChatReq().streamKey(),
        payload: (data) => this.consume(data),
      },
    ];
  }

  async consume(v: ChatReq) {
    console.log(v);
  }
}
