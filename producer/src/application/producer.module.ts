import { Module } from '@nestjs/common';
import { CreateChatService } from './service/create-chat.service';

@Module({
  imports: [],
  providers: [CreateChatService],
  exports: [CreateChatService],
})
export class ProducerModule {}
