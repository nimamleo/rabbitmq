import { ItemStubs } from './item.stubs';
import { IInvoice } from '../../../../../model/invoice.model';

export class Option {}

export const InvoiceStubs = (option?: Option): IInvoice => {
  const item: IInvoice = {
    amount: 2,
    date: new Date(),
    reference: 'test',
    customer: 'test',
    items: [ItemStubs({})],
  };

  return item;
};
