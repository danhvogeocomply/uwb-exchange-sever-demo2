import { ClientName, ClientStatus } from '../entities/session.entity';

export class UpdateSessionDto {
  from: ClientName;
  status: ClientStatus;
}
