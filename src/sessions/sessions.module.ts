import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { AccessoriesModule } from 'src/accessories/accessories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), AccessoriesModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
