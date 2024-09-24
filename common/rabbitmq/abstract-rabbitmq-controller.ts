import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Logger } from '@nestjs/common';
import { ConfirmChannel } from 'amqplib';

export abstract class AbstractRabbitmqController {
  abstract Logger(): Logger;

  abstract client(): ChannelWrapper;

  abstract streams: { id: number; value: any }[];

  async assertQueue(queueName: string) {
    try {
      return await this.client().assertQueue(queueName);
    } catch (e) {
      this.Logger().verbose(`can not create queue`);
      return;
    }
  }

  async addToQueue(queueName: string, value: any) {
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
            this.Logger().verbose(content);
            c.ack(msg);
            this.streams.push(content);
            return content;
          }
        });
      });
    } catch (e) {}
  }
}
