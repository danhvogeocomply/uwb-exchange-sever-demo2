import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { AccessoriesModule } from 'src/accessories/accessories.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UwMqttbBroker } from 'src/core/configs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    AccessoriesModule,
    ClientsModule.register([
      {
        name: UwMqttbBroker.name,
        transport: Transport.MQTT,
        options: {
          url: UwMqttbBroker.url,
        },
      },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
