import { Result } from '@common/result';

export interface IEmailProvider {
  sendEmail(
    email: string,
    subject: string,
    template: string,
    args?: Record<string, any>,
  ): Promise<Result<boolean>>;
}
export const EMAIL_PROVIDER = 'email-provider';
