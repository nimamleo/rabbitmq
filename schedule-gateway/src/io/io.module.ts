import { Module } from '@nestjs/common';
import { InvoiceCronJobsService } from './cron-jobs/invoice-cron-jobs.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CommandClientModule } from '../infrastructure/comand-client/command-client.module';
import { InvoiceModule } from '@invoice/application/invoice/invoice.module';

@Module({
  imports: [ScheduleModule.forRoot(), CommandClientModule, InvoiceModule],
  providers: [InvoiceCronJobsService],
  exports: [InvoiceCronJobsService],
})
export class IoModule {}
