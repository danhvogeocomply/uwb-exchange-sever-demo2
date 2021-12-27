import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ClientName, ClientStatus } from '../entities/session.entity';

export class UpdateSessionDto {
  @ApiProperty({ enum: ClientName })
  @IsEnum({ enum: ClientName })
  from: ClientName;

  @IsEnum({ enum: ClientStatus })
  @ApiProperty({ enum: ClientStatus })
  status: ClientStatus;
}
