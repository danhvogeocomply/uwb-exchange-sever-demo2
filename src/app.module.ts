import { Module } from '@nestjs/common';
import { AccessoriesModule } from './accessories/accessories.module';
import { SessionsModule } from './sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { MqttModule } from './mqtt/mqtt.module';
import { UWB_MQTT_BROKER } from './core/configs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AccessoriesModule,
    SessionsModule,
    MqttModule.forRoot({
      port: UWB_MQTT_BROKER.port,
      host: UWB_MQTT_BROKER.host,
    }),
  ],
})
export class AppModule {}
