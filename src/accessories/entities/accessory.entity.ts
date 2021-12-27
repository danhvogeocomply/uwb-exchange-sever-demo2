import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accessory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({
    example: '00-14-22-01-23-45',
    description: 'The mac address of accessory',
  })
  macAddress: string;

  @Column()
  @ApiProperty()
  acd: string;
}
