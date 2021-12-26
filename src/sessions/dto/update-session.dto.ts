import { PartialType } from '@nestjs/mapped-types';
import { ClientName, ClientStatus } from '../entities/session.entity';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  status: {
    from: ClientName;
    status: ClientStatus;
  };
}
