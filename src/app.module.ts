import { Module } from '@nestjs/common';
import { AccessoriesModule } from './accessories/accessories.module';
import { SessionsModule } from './sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

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
  ],
})
export class AppModule {}
