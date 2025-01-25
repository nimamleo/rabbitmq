export class InvoiceEmailDetail {
  totalQuantity: number;
  totalSale: number;
  sku: string;
}
export class InvoiceEmailRequest {
  email: string;
  list: InvoiceEmailDetail[];
}
