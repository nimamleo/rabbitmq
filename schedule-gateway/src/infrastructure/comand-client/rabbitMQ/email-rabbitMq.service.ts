import { Injectable } from '@nestjs/common';
import { IEmailWriter } from '../provider/email.provider';
import { InvoiceEmailRequest } from '../model/invoice/invoice-email.model';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { Stream } from '@common/rabbitmq/stream.interface';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Logger } from '@nestjs/common';
import { EmailCreate } from '@common/streams/rabbitmq/email.model';
import { DailySaleReport } from '@common/streams/queue/daily-sale-report.model';

@Injectable()
export class EmailRabbitMqService
  extends AbstractRabbitMQController
  implements IEmailWriter
{
  private readonly logger: Logger = new Logger(EmailRabbitMqService.name);
  private channelWrapper: ChannelWrapper;
  constructor() {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }
  streams(): Stream[] {
    return [];
  }

  Logger(): Logger {
    return this.logger;
  }

  client() {
    return this.channelWrapper;
  }

  @HandleError
  async sendInvoiceEmail(req: InvoiceEmailRequest): Promise<Result<boolean>> {
    const data = new EmailCreate({ email: req.email, data: req.list });

    const res = await this.addToQueue(DailySaleReport, {
      name: data.streamKey(),
      value: data,
    });
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(true);
  }
}
