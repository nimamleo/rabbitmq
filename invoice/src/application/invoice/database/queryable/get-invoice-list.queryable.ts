import { ILimitation } from '@common/pagination/limitation.interface';

export class GetInvoiceListQueryable {
  limitation: ILimitation;
  date?: Date;
}
