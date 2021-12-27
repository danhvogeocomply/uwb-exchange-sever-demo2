import { Logger, Provider } from '@nestjs/common';
import { connect, IClientOptions } from 'mqtt';
import { UWB_MQTT_BROKER } from 'src/core/configs';
import { MQTT_LOGGER_PROVIDER, MQTT_OPTION_PROVIDER } from './constants';

export function createClientProvider(): Provider {
  return {
    provide: UWB_MQTT_BROKER.name,
    useFactory: (options: IClientOptions, logger: Logger) => {
      const client = connect(options);

      client.on('connect', () => {
        logger.debug('MQTT connected');
      });

      client.on('disconnect', () => {
        logger.warn('MQTT disconnected');
      });

      client.on('error', (error) => {
        logger.warn('MQTT error', error);
      });

      client.on('reconnect', () => {
        logger.debug('MQTT reconnecting');
      });

      client.on('close', () => {
        logger.debug('MQTT closed');
      });

      client.on('offline', () => {
        logger.warn('MQTT offline');
      });

      return client;
    },
    inject: [MQTT_OPTION_PROVIDER, MQTT_LOGGER_PROVIDER],
  };
}
