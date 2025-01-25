import { Module } from '@nestjs/common';
import { EmailService } from './application/email.service';

@Module({
  providers: [EmailService],
})
export class AppModule {}
