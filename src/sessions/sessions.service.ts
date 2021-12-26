import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { AccessoriesService } from 'src/accessories/accessories.service';
import { TOPIC, UwMqttbBroker } from 'src/core/configs';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Client, ClientStatus, Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    private accessoriesService: AccessoriesService,
    @Inject(UwMqttbBroker.name) private readonly client: ClientProxy,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const record = new Session();
    record.ascd = createSessionDto.ascd;
    record.phoneName = createSessionDto.phoneName;
    record.status = {
      [Client.ACCESSORY]: ClientStatus.INITIAL,
      [Client.MOBILE]: ClientStatus.INITIAL,
    };

    const accessory = await this.accessoriesService.findOne(
      createSessionDto.accessoryId,
    );

    if (!accessory) {
      throw new BadRequestException('Invalid accessory id');
    }
    record.accessory = accessory;
    await this.pushEventSessionCreated(record);
    return this.sessionsRepository.save(record);
  }

  private pushEventSessionCreated(data: Session) {
    const userProperties = { 'x-version': '1.0.0' };
    const record = new MqttRecordBuilder(data)
      .setProperties({ userProperties })
      .setQoS(1)
      .build();
    return firstValueFrom(this.client.send(TOPIC.SESSION, record));
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
