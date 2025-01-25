import { IInvoice, IInvoiceEntity } from '../../model/invoice.model';
import { Result } from '@common/result';
import { GetInvoiceListQueryable } from '../queryable/get-invoice-list.queryable';
import { GetSummaryDto } from '../dto/get-summary.dto';

export interface IInvoiceDatabaseReader {
  getInvoiceById(id: string): Promise<Result<IInvoiceEntity>>;

  getInvoiceList(
    queryable: GetInvoiceListQueryable,
  ): Promise<Result<[IInvoiceEntity[], number]>>;

  getDailySales(): Promise<Result<GetSummaryDto[]>>;
}
export interface IInvoiceDatabaseWriter {
  createInvoice(data: IInvoice): Promise<Result<IInvoiceEntity>>;
}
export interface IInvoiceDatabaseProvider
  extends IInvoiceDatabaseReader,
    IInvoiceDatabaseWriter {}

export const INVOICE_DATABASE_PROVIDER = 'invoice-database-provider';
