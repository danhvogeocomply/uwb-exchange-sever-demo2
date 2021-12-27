import { ApiProperty } from '@nestjs/swagger';
import { IsMACAddress, IsString } from 'class-validator';

export class CreateAccessoryDto {
  @IsString()
  @IsMACAddress()
  @ApiProperty()
  macAddress: string;

  @IsString()
  @ApiProperty()
  acd: string;
}

export class CreateAccessoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  msg: string;
}
