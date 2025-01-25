import { ApiProperty } from '@nestjs/swagger';

export class GetInvoiceRequest {}
//=========================================RESPONSE=========================================

export class GetInvoiceItemResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  qt: number;
}

export class GetInvoiceResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customer: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  date: string;

  @ApiProperty({ type: [GetInvoiceItemResponse] })
  items: GetInvoiceItemResponse[];
}
