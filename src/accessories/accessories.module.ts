import { Module } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './entities/accessory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accessory])],
  controllers: [AccessoriesController],
  providers: [AccessoriesService],
  exports: [TypeOrmModule],
})
export class AccessoriesModule {}
