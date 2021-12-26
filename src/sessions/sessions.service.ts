import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessoriesService } from 'src/accessories/accessories.service';
import { TOPIC } from 'src/core/configs';
import { MqttService } from 'src/mqtt/mqtt.service';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ClientName, ClientStatus, Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    private accessoriesService: AccessoriesService,
    private mqttService: MqttService,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const record = new Session();
    record.ascd = createSessionDto.ascd;
    record.phoneName = createSessionDto.phoneName;
    record.status = {
      [ClientName.ACCESSORY]: ClientStatus.INITIAL,
      [ClientName.MOBILE]: ClientStatus.INITIAL,
    };

    const accessory = await this.accessoriesService.findOne(
      createSessionDto.accessoryId,
    );

    if (!accessory) {
      throw new BadRequestException('Invalid accessory id');
    }
    record.accessory = accessory;
    await this.mqttService.publish(TOPIC.SESSION, record, { qos: 1 });
    return this.sessionsRepository.save(record);
  }

  async findOne(id: number) {
    const session = await this.sessionsRepository.findOne(id, {
      relations: ['accessory'],
    });
    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const record = await this.findOne(id);
    if (!record) {
      throw new NotFoundException(`Session not found with id = ${id}`);
    }
    const { status: oldStatus } = record;
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
