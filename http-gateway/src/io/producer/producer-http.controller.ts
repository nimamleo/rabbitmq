import { Controller, Post, Body } from '@nestjs/common';
import { CreateChat } from './models/creat-chat.model';
import { CreateChatService } from '@producer/application/service/create-chat.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('producer')
@ApiTags('Producer')
export class ProducerHttpController {
  constructor(private readonly producerService: CreateChatService) {}

  @Post('chat')
  async createChat(@Body() body: CreateChat) {
    await this.producerService.createChat({
      content: body.content,
      userId: body.userid,
      id: body.id,
    });

    return true;
  }
}
