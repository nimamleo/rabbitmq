import { Stream } from '../streamKey.interface';

export class ChatReq implements Stream {
  content: string;

  constructor(init?: Partial<ChatReq>) {
    Object.assign(this, init);
  }

  streamKey(): string {
    return 'chat:create';
  }
}
export class ChatRes {}
