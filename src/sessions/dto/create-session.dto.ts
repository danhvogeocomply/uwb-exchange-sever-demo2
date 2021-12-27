import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { ClientName, ClientStatus } from '../entities/session.entity';

export class CreateSessionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  accessoryId: number;

  @ApiProperty()
  @IsString()
  ascd: string;

  @ApiProperty()
  @IsString()
  phoneName: string;
}

export class SessionStatusDto {
  @ApiProperty()
  [ClientName.ACCESSORY]: ClientStatus;
  @ApiProperty()
  [ClientName.MOBILE]: ClientStatus;
}
export class CreateSessionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  msg: string;

  @ApiProperty()
  status: SessionStatusDto;
}
