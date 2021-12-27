import { ApiProperty } from '@nestjs/swagger';

export class DeleteAllSessionsResponseDto {
  @ApiProperty()
  msg: string;
}
