import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Injectable()
export class AppService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel();
  }

  async onModuleInit() {
    await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertQueue('ChatQueue', { durable: true });
      await channel.consume('ChatQueue', async (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          channel.ack(msg);
          console.log(content);
        }
      });
    });
  }
}
