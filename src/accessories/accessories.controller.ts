import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessoriesService } from './accessories.service';
import {
  CreateAccessoryDto,
  CreateAccessoryResponseDto,
} from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';

@ApiTags('accessories')
@Controller('accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new accessory' })
  @ApiResponse({ status: 201, description: 'Create accessory successfully.' })
  async create(
    @Body() createAccessoryDto: CreateAccessoryDto,
  ): Promise<CreateAccessoryResponseDto> {
    const newRecord = await this.accessoriesService.create(createAccessoryDto);
    return {
      msg: 'create success',
      id: newRecord.id,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Find an accessory' })
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

  @Put(':id')
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

  @Delete()
  async removeAll() {
    await this.accessoriesService.removeAll();
    return { msg: `all accessories deleted` };
  }
}
