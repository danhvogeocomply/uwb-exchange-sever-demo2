import { PartialType } from '@nestjs/mapped-types';
import { Client, ClientStatus } from '../entities/session.entity';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  status: {
    from: Client;
    status: ClientStatus;
  };
}
