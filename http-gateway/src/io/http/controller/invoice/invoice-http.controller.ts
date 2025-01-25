import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
} from './models/creat-invoice.model';
import { InvoiceService } from '@invoice/application/invoice/service/invoice.service';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { Ok } from '@common/result';
import { GetInvoiceResponse } from './models/get-invoice-id.model';
import { Pagination } from '@common/pagination/pagination.model';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import {
  GetInvoiceListRequest,
  GetInvoiceListResponse,
} from './models/get-invoices-list.model';

@Controller('invoices')
@ApiTags('Producer')
@UsePipes(ValidationPipe)
export class InvoiceHttpController extends AbstractHttpController {
  constructor(private readonly invoiceService: InvoiceService) {
    super();
  }

  @Post('')
  async createInvoice(
    @Res() response: Response,
    @Body() body: CreateInvoiceRequest,
  ) {
    const createInvoice = await this.invoiceService.createInvoice({
      customer: body.customer,
      amount: body.amount,
      reference: body.reference,
      items: body.items,
    });
    if (createInvoice.isError()) {
      this.sendResult(response, createInvoice);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateInvoiceResponse>({
        id: createInvoice.value.id,
        amount: createInvoice.value.amount,
        reference: createInvoice.value.reference,
        customer: createInvoice.value.customer,
        date: createInvoice.value.date.toISOString(),
        items: createInvoice.value.items.map((x) => ({
          id: x.id,
          sku: x.sku,
          qt: x.qt,
        })),
      }),
    );
  }

  @Get('/:invoiceId')
  async getInvoiceById(
    @Res() response: Response,
    @Param('invoiceId') id: string,
  ) {
    const getInvoice = await this.invoiceService.getInvoiceById(id);
    if (getInvoice.isError()) {
      this.sendResult(response, getInvoice);
      return;
    }

    this.sendResult(
      response,
      Ok<GetInvoiceResponse>({
        id: getInvoice.value.id,
        amount: getInvoice.value.amount,
        reference: getInvoice.value.reference,
        customer: getInvoice.value.customer,
        date: getInvoice.value.date.toISOString(),
        items: getInvoice.value.items.map((x) => ({
          id: x.id,
          sku: x.sku,
          qt: x.qt,
        })),
      }),
    );
  }

  @Get()
  async getInvoiceList(
    @Res() response: Response,
    @Query() query: GetInvoiceListRequest,
  ) {
    const pagination = new Pagination(query.page);
    const invoices = await this.invoiceService.getInvoiceList(
      {
        skip: pagination.getSkip(),
        limit: pagination.getLimit(),
      },
      new Date(Number(query.date)),
    );
    if (invoices.isError()) {
      this.sendResult(response, invoices);
      return;
    }

    this.sendResult(
      response,
      Ok<IPaginatedResult<GetInvoiceListResponse>>({
        list: invoices.value.list.map((x) => ({
          id: x.id,
          amount: x.amount,
          reference: x.reference,
          customer: x.customer,
          date: x.date.toISOString(),
          items: x.items.map((i) => ({ id: i.id, sku: i.sku, qt: i.qt })),
        })),
        page: invoices.value.page,
        pageSize: invoices.value.pageSize,
        total: invoices.value.total,
      }),
    );
  }
}
