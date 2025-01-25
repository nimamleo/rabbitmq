import { Injectable, Logger } from '@nestjs/common';
import { IEmailProvider } from '../../provider/email.provider';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailSmtpService implements IEmailProvider {
  private readonly logger = new Logger(EmailSmtpService.name);
  constructor(private readonly emailClient: MailerService) {}

  @HandleError
  async sendEmail(
    email: string,
    subject: string,
    template: string,
    args?: Record<string, any>,
  ): Promise<Result<boolean>> {
    const res = await this.emailClient.sendMail({
      to: email,
      subject: subject,
      template: `./${template}-${args['lang']}`,
      context: args,
    });

    if (!res) {
      this.logger.debug(`send email failed with error ${res}`);
      return Err(JSON.stringify(res));
    }

    this.logger.debug(`email sent successfully`);
    return Ok(true);
  }
}
