import { InvoiceEmailRequest } from '../model/invoice/invoice-email.model';
import { Result } from '@common/result';

export interface IEmailWriter {
  sendInvoiceEmail(req: InvoiceEmailRequest): Promise<Result<boolean>>;
}

export const EMAIL_WRITER = 'email-writer';
