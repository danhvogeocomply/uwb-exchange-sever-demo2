import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Accessory } from './entities/accessory.entity';

@Injectable()
export class AccessoriesService {
  constructor(
    @InjectRepository(Accessory)
    private accessoriesRepository: Repository<Accessory>,
  ) {}

  create(createAccessoryDto: CreateAccessoryDto) {
    const record = new Accessory();
    record.acd = createAccessoryDto.acd;
    record.macAddress = createAccessoryDto.macAddress;
    return this.accessoriesRepository.save(record);
  }

  findAll() {
    return this.accessoriesRepository.find();
  }

  findOne(id: number) {
    return this.accessoriesRepository.findOne(id);
  }

  async update(id: number, updateAccessoryDto: UpdateAccessoryDto) {
    const record = await this.findOne(id);
    if (!record) {
      throw new NotFoundException(`Accessory not found with id = ${id}`);
    }
    return this.accessoriesRepository.update(+id, updateAccessoryDto);
  }

  async remove(id: number) {
    await this.accessoriesRepository.delete(id);
  }

  async removeAll() {
    await this.accessoriesRepository.clear();
  }
}
