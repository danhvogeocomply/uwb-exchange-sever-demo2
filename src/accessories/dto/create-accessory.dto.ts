import { IsMACAddress, IsString } from 'class-validator';

export class CreateAccessoryDto {
  @IsString()
  @IsMACAddress()
  macAddress: string;

  @IsString()
  acd: string;
}

export class CreateAccessoryResponseDto {
  id: number;
  msg: string;
}
