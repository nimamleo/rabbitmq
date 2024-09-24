import { Module } from '@nestjs/common';
import { ProducerHttpController } from './producer/producer-http.controller';
import { ProducerModule } from '@producer/application/producer.module';

@Module({
  imports: [ProducerModule],
  controllers: [ProducerHttpController],
})
export class IoModule {}
