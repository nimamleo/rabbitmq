import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { AbstractRabbitmqController } from '@common/rabbitmq/abstract-rabbitmq-controller';

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

  async consume(queueName: string) {
    const a = await this.consumeQueue(queueName);
    console.log(a);
  }
}
