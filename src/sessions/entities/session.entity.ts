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

export enum Client {
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

  @ManyToOne(() => Accessory, {
    primary: true,
  })
  @JoinColumn()
  accessory: Accessory;

  @Column('simple-json')
  status: {
    [Client.MOBILE]: ClientStatus;
    [Client.ACCESSORY]: ClientStatus;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
