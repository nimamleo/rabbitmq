import { Module } from '@nestjs/common';
import { InvoiceHttpController } from './http/controller/invoice/invoice-http.controller';
import { InvoiceModule } from '@invoice/application/invoice/invoice.module';

@Module({
  imports: [InvoiceModule],
  controllers: [InvoiceHttpController],
})
export class IoModule {}
