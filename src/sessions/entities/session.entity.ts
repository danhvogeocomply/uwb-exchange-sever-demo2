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

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ascd: string;

  @Column()
  phoneName: string;

  @ManyToOne(() => Accessory)
  @JoinColumn()
  accessory: Accessory;

  @Column('simple-json')
  status: {
    [ClientName.MOBILE]: ClientStatus;
    [ClientName.ACCESSORY]: ClientStatus;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
