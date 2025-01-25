import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceItem {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  qt: number;
}

export class CreateInvoiceRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reference: string;

  @ApiProperty({ type: [CreateInvoiceItem] })
  @IsOptional()
  items: CreateInvoiceItem[];
}
//=========================================RESPONSE=========================================

export class CreateInvoiceItemResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  qt: number;
}

export class CreateInvoiceResponse {
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

  @ApiProperty({ type: [CreateInvoiceItemResponse] })
  items: CreateInvoiceItemResponse[];
}
