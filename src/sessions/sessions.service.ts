import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accessory } from 'src/accessories/entities/accessory.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Client, ClientStatus, Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    @InjectRepository(Accessory)
    private accessoriesRepository: Repository<Accessory>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const record = new Session();
    record.ascd = createSessionDto.ascd;
    record.phoneName = createSessionDto.phoneName;
    record.status[Client.ACCESSORY] = ClientStatus.INITIAL;
    record.status[Client.MOBILE] = ClientStatus.INITIAL;

    const accessory = await this.accessoriesRepository.findOne(
      createSessionDto.accessoryId,
    );
    if (!accessory) {
      throw new BadRequestException('Invalid accessory id');
    }
    record.accessory = accessory;
    return this.sessionsRepository.save(record);
  }

  async findOne(id: number) {
    const session = await this.sessionsRepository.findOne(id, {
      relations: ['accessory'],
    });
    if (!session) {
      throw new NotFoundException(`Session not found with id = ${id}`);
    }
    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const { status: oldStatus } = await this.findOne(id);
    const { status, ...data } = updateSessionDto;
    await this.sessionsRepository.update(id, {
      ...data,
      status: {
        ...oldStatus,
        ...status,
      },
    });
  }

  async remove(id: number) {
    await this.sessionsRepository.delete(id);
  }

  async removeAll() {
    await this.sessionsRepository.clear();
  }
}
