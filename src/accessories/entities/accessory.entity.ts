import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accessory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  macAddress: string;

  @Column()
  acd: string;
}
