import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class GetInvoiceListRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  date: string;
}
//=========================================RESPONSE=========================================

export class GetInvoiceListItemResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  qt: number;
}

export class GetInvoiceListResponse {
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

  @ApiProperty({ type: [GetInvoiceListItemResponse] })
  items: GetInvoiceListItemResponse[];
}
