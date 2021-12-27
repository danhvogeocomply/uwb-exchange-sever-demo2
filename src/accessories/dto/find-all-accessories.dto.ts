import { ApiProperty } from '@nestjs/swagger';
import { Accessory } from '../entities/accessory.entity';

export class FindAllAccessoriesDto {
  @ApiProperty({ type: [Accessory] })
  accessories: Accessory[];

  @ApiProperty()
  total: number;
}
