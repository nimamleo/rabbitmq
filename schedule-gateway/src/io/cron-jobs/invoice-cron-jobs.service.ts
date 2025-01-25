import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  EMAIL_WRITER,
  IEmailWriter,
} from '../../infrastructure/comand-client/provider/email.provider';
import { InvoiceService } from '@invoice/application/invoice/service/invoice.service';

@Injectable()
export class InvoiceCronJobsService {
  private readonly logger = new Logger(InvoiceCronJobsService.name);
  constructor(
    // @Inject(EMAIL_WRITER) private readonly emailWriter: IEmailWriter,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async sendInvoiceEmail() {
    const getSummary = await this.invoiceService.getDailySales();
    if (getSummary.isError()) {
      this.logger.error('get summary failed');
      return;
    }

    // const res = await this.emailWriter.sendInvoiceEmail({
    //   email: 'nimamahini81@gmail.com',
    //   list: getSummary.value.map((x) => ({
    //     totalSale: x.totalSale,
    //     totalQuantity: x.totalQuantitySold,
    //     sku: x.sku,
    //   })),
    // });
    // if (res.isError()) {
    //   this.logger.error('send summary failed');
    // }
    this.logger.debug('summary detail added to QUEUE');
  }
}
