import { Module } from '@nestjs/common';
import { AppService } from './application/app.service';

@Module({
  providers: [AppService],
})
export class AppModule {}
