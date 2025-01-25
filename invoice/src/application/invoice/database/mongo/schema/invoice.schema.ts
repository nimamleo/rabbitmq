import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Item } from './item.schema';
import { IInvoice, IInvoiceEntity } from '../../../model/invoice.model';

@Schema({ collection: 'invoice' })
export class Invoice {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  customer: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String })
  reference: string;

  @Prop({ required: true, type: Types.Array })
  items: Item[];

  @Prop({ required: false, type: Date })
  date: Date;

  static fromIInvoice(iInvoice: IInvoice): Invoice {
    if (!iInvoice) {
      return null;
    }

    const invoice = new Invoice();

    invoice.amount = iInvoice.amount;
    invoice.customer = iInvoice.customer;
    invoice.reference = iInvoice.reference;
    invoice.items = iInvoice.items.map((x) =>
      Item.fromIItem({
        sku: x.sku,
        qt: x.qt,
      }),
    );
    invoice.date = new Date();

    return invoice;
  }

  static toIInvoiceEntity(invoice: Invoice): IInvoiceEntity {
    if (!invoice) {
      return null;
    }

    return {
      id: invoice._id.toString(),
      amount: invoice.amount,
      customer: invoice.customer,
      reference: invoice.reference,
      date: invoice.date,
      items: invoice.items
        ? invoice.items.map((x) => Item.toIItemEntity(x))
        : [],
    };
  }
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
