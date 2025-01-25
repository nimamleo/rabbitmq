import { Inject, Injectable } from '@nestjs/common';
import {
  IInvoiceDatabaseProvider,
  INVOICE_DATABASE_PROVIDER,
} from '../database/provider/invoice-database.provider';
import { Err, Ok, Result } from '@common/result';
import { IInvoice, IInvoiceEntity } from '../model/invoice.model';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { ILimitation } from '@common/pagination/limitation.interface';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import { PaginationResult } from '@common/pagination/paginatio-result';
import { GetSummaryDto } from '../database/dto/get-summary.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(INVOICE_DATABASE_PROVIDER)
    private readonly invoiceDatabaseProvider: IInvoiceDatabaseProvider,
  ) {}

  @HandleError
  async getInvoiceById(id: string): Promise<Result<IInvoiceEntity>> {
    const res = await this.invoiceDatabaseProvider.getInvoiceById(id);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async getInvoiceList(
    limitation: ILimitation,
    date: Date,
  ): Promise<Result<IPaginatedResult<IInvoiceEntity>>> {
    const res = await this.invoiceDatabaseProvider.getInvoiceList({
      date: date,
      limitation: limitation,
    });
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(new PaginationResult(res.value[0], res.value[1], limitation));
  }

  @HandleError
  async createInvoice(data: IInvoice): Promise<Result<IInvoiceEntity>> {
    const res = await this.invoiceDatabaseProvider.createInvoice(data);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async getDailySales(): Promise<Result<GetSummaryDto[]>> {
    const res = await this.invoiceDatabaseProvider.getDailySales();
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }
}
