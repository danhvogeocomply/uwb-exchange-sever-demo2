import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Accessory } from 'src/accessories/entities/accessory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ClientStatus {
  INITIAL = 'initial',
  STARTED = 'started',
  TIMEOUT = 'timeout',
  STOPPED = 'stopped',
}

export enum ClientName {
  MOBILE = 'mobile',
  ACCESSORY = 'accessory',
}

export class SessionStatusDto {
  @ApiProperty()
  [ClientName.ACCESSORY]: ClientStatus;
  @ApiProperty()
  [ClientName.MOBILE]: ClientStatus;
}

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  ascd: string;

  @Column()
  @IsString()
  @ApiProperty()
  phoneName: string;

  @ManyToOne(() => Accessory)
  @JoinColumn()
  accessory: Accessory;

  @Column('simple-json')
  @ApiProperty({ type: SessionStatusDto })
  status: {
    [ClientName.MOBILE]: ClientStatus;
    [ClientName.ACCESSORY]: ClientStatus;
  };

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
