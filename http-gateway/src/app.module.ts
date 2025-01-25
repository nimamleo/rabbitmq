import { Module } from '@nestjs/common';
import { IoModule } from './io/io.module';
import { ConfigModule } from '@nestjs/config';
import { mongoConfig } from '@infrastructure/infrastrucute/database/mongodb/config/mongo.config';

@Module({
  imports: [
    IoModule,
    ConfigModule.forRoot({
      cache: true,
      load: [mongoConfig],
    }),
  ],
})
export class AppModule {}
