import { Module } from '@nestjs/common';
import { InvoiceCronJobsService } from './cron-jobs/invoice-cron-jobs.service';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoiceModule } from '@invoice/application/invoice/invoice.module';

@Module({
  imports: [ScheduleModule.forRoot(), InvoiceModule],
  providers: [InvoiceCronJobsService],
  exports: [InvoiceCronJobsService],
})
export class IoModule {}
