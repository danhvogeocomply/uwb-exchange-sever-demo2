import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Session } from '../entities/session.entity';

export class FindSessionByIdDto extends OmitType(Session, ['accessory']) {
  @ApiProperty()
  accessoryId: number;
}
