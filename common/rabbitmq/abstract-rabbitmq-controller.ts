import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Logger } from '@nestjs/common';
import { ConfirmChannel } from 'amqplib';
import { Streams } from './streams.interface';
import { Stream } from './streamKey.interface';
import { Message } from './models/message.model';

export abstract class AbstractRabbitmqController {
  abstract Logger(): Logger;

  abstract client(): ChannelWrapper;

  abstract streams(): Streams[];

  async assertQueue(queueName: string) {
    try {
      return await this.client().assertQueue(queueName);
    } catch (e) {
      this.Logger().verbose(`can not create queue`);
      return;
    }
  }

  async addToQueue<T>(queueName: string, value: Message<T>) {
    try {
      await this.assertQueue(queueName);
      await this.client().sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(value)),
        { persistent: true },
      );
    } catch (e) {
      console.log(e);
    }
  }

  async consumeQueue(queueName: string): Promise<any> {
    try {
      this.Logger().verbose(`consuming ${queueName}`);
      await this.client().addSetup(async (c: ConfirmChannel) => {
        await c.assertQueue(queueName);
        await c.consume(queueName, async (msg) => {
          if (msg) {
            const content = JSON.parse(msg.content.toString());
            const target = this.streams().find((x) => x.name == content.name);
            await target.payload(content.value);

            c.ack(msg);
            return content;
          }
        });
      });
    } catch (e) {}
  }
}
