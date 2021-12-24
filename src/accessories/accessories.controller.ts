import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';

@Controller('accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Post()
  async create(@Body() createAccessoryDto: CreateAccessoryDto) {
    const newRecord = await this.accessoriesService.create(createAccessoryDto);
    return {
      msg: 'create success',
      id: newRecord.id,
    };
  }

  @Get()
  async findAll() {
    const accessories = await this.accessoriesService.findAll();
    return {
      accessories,
      total: accessories.length,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoriesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccessoryDto: UpdateAccessoryDto,
  ) {
    await this.accessoriesService.update(+id, updateAccessoryDto);
    return {
      msg: 'update success',
      id,
    };
  }

  @Delete(':id')
  remove(@Param('id') id?: string) {
    if (id) return this.accessoriesService.remove(+id);
    return this.accessoriesService.removeAll();
  }
}
