import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IItemEntity } from './item.model';

export interface IInvoice {
  customer: string;
  amount: number;
  reference: string;
  items: Partial<IItemEntity>[];
  date: Date;
}
export interface IInvoiceEntity extends IInvoice, IEntity {}
