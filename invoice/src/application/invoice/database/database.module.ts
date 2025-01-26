import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './mongo/schema/invoice.schema';
import { INVOICE_DATABASE_PROVIDER } from './provider/invoice-database.provider';
import { InvoiceMongoService } from './mongo/service/invoice-mongo.service';
import { CoreDatabaseModule } from '@infrastructure/infrastrucute/database/core-database.module';

@Module({
  imports: [
    CoreDatabaseModule,
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: INVOICE_DATABASE_PROVIDER,
      useClass: InvoiceMongoService,
    },
  ],
  exports: [INVOICE_DATABASE_PROVIDER],
})
export class DatabaseModule {}
