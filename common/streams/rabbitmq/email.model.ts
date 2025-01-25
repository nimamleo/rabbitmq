import { StreamKey } from '../../rabbitmq/stream-key';

export class EmailCreate implements StreamKey {
  email: string;
  data: Record<any, any>;

  constructor(init?: Partial<EmailCreate>) {
    Object.assign(this, init);
  }

  streamKey(): string {
    return 'email:create';
  }
}

export class EmailCreated {
  success: boolean;

  constructor(init?: Partial<EmailCreated>) {
    Object.assign(this, init);
  }

  streamKey(): string {
    return 'email:created';
  }
}
