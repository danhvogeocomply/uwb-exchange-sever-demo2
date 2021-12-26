import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { UwMqttbBroker } from './core/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: UwMqttbBroker.url,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
