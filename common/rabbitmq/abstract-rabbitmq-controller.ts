import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Logger } from '@nestjs/common';
import { ConfirmChannel } from 'amqplib';
import { Streams } from './streams.interface';
import { Message } from './message.interface';

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

  async addToQueue(queueName: string, value: Message) {
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
        await c.consume(queueName, (msg) => {
          if (msg) {
            const content = JSON.parse(msg.content.toString());
            for (const x of this.streams()) {
              if (x.correlationId === content.correlationId) {
                x.payload = content.vale;
              }
            }
            this.Logger().verbose(content);
            c.ack(msg);
            this.streams().push(content);
            return content;
          }
        });
      });
    } catch (e) {}
  }
}
