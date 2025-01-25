import { Module } from '@nestjs/common';
import { EMAIL_WRITER } from './provider/email.provider';
import { EmailRabbitMqService } from './rabbitMQ/email-rabbitMq.service';

@Module({
  providers: [
    {
      provide: EMAIL_WRITER,
      useClass: EmailRabbitMqService,
    },
  ],
  exports: [EMAIL_WRITER],
})
export class CommandClientModule {}
