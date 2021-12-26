import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { IClientOptions } from 'mqtt';
import { createClientProvider } from './client.provider';
import { MQTT_LOGGER_PROVIDER, MQTT_OPTION_PROVIDER } from './constants';
import { MqttService } from './mqtt.service';

@Global()
@Module({
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {
  public static forRoot(options: IClientOptions): DynamicModule {
    return {
      module: MqttModule,
      providers: [
        {
          provide: MQTT_OPTION_PROVIDER,
          useValue: options,
        },
        {
          provide: MQTT_LOGGER_PROVIDER,
          useValue: new Logger('MqttModule'),
        },
        createClientProvider(),
        MqttService,
      ],
      exports: [],
    };
  }
}
