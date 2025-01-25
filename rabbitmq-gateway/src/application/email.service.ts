import { Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { Stream } from '@common/rabbitmq/stream.interface';
import { EmailCreate } from '@common/streams/rabbitmq/email.model';
import { HandleError } from '@common/decorators/handle-error.decorator';

@Injectable()
export class EmailService extends AbstractRabbitMQController {
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

  streams(): Stream[] {
    return [
      {
        name: new EmailCreate().streamKey(),
        payload: (data) => this.sendEmail(data),
      },
    ];
  }

  @HandleError
  async sendEmail(req: EmailCreate) {
    console.log(req);
  }
}
