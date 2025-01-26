import { Injectable } from '@nestjs/common';
import { IInvoiceDatabaseProvider } from '../../provider/invoice-database.provider';
import { IInvoice, IInvoiceEntity } from '../../../model/invoice.model';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from '../schema/invoice.schema';
import { Model, Types } from 'mongoose';
import { GenericStatusCodes } from '@common/enums/status.enum';
import { GetInvoiceListQueryable } from '../../queryable/get-invoice-list.queryable';
import { GetSummaryDto } from '../../dto/get-summary.dto';

@Injectable()
export class InvoiceMongoService implements IInvoiceDatabaseProvider {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  @HandleError
  async createInvoice(data: IInvoice): Promise<Result<IInvoiceEntity>> {
    const newData = Invoice.fromIInvoice(data);
    const res = await this.invoiceModel.create(newData);
    if (!res) {
      return Err('create invoice failed', GenericStatusCodes.INTERNAL);
    }

    return Ok(Invoice.toIInvoiceEntity(res));
  }

  @HandleError
  async getInvoiceById(id: string): Promise<Result<IInvoiceEntity>> {
    const res = await this.invoiceModel.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!res) {
      return Err('invoice not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(Invoice.toIInvoiceEntity(res));
  }

  @HandleError
  async getInvoiceList(
    queryable: GetInvoiceListQueryable,
  ): Promise<Result<[IInvoiceEntity[], number]>> {
    const options = {};
    const filter = {};

    if (queryable.limitation) {
      options['limit'] = queryable.limitation.limit;
      options['skip'] = queryable.limitation.skip;
    }

    if (queryable.date && queryable.date instanceof Date) {
      filter['date'] = queryable.date;
    }

    const res = await this.invoiceModel.find(
      { date: { $gt: queryable.date } },
      {},
      options,
    );
    const count = await this.invoiceModel.countDocuments(filter);

    return Ok([res.map((x) => Invoice.toIInvoiceEntity(x)), count]);
  }

  @HandleError
  async getDailySales(): Promise<Result<GetSummaryDto[]>> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const salesSummary = await this.invoiceModel.aggregate([
      {
        $match: {
          date: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $group: {
          _id: '$items.sku',
          totalQuantitySold: { $sum: '$items.qt' },
          totalSalesAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          sku: '$_id',
          totalQuantitySold: 1,
          totalSalesAmount: 1,
          _id: 0,
        },
      },
    ]);

    return Ok(salesSummary);
  }
}
