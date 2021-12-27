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

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
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
    await this.sessionsRepository.save(record);
    await this.mqttService.publish(
      TOPIC.SESSION,
      { type: 'session-created', data: record },
      { qos: 1 },
    );
    return record;
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionsRepository.findOne(id, {
      relations: ['accessory'],
    });
    if (!session) {
      throw new NotFoundException(`Session not found with id = ${id}`);
    }
    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const record = await this.findOne(id);
    const { status: oldStatus } = record;
    const { from, status } = updateSessionDto;
    const data = {
      status: {
        ...oldStatus,
        [from]: status,
      },
    };
    await this.sessionsRepository.update(id, data);
    await this.mqttService.publish(
      TOPIC.SESSION,
      { type: 'session-updated', data },
      { qos: 1 },
    );
  }

  async remove(id: number) {
    await this.sessionsRepository.delete(id);
    await this.mqttService.publish(
      TOPIC.SESSION,
      { type: 'session-deleted', id },
      { qos: 1 },
    );
  }

  async removeAll() {
    await this.sessionsRepository.clear();
    await this.mqttService.publish(
      TOPIC.SESSION,
      { type: 'deleted-all-sessions' },
      { qos: 1 },
    );
  }
}
