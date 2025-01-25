import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InvoiceService } from './service/invoice.service';

@Module({
  imports: [DatabaseModule],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
