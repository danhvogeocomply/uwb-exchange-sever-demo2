import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const session = await this.sessionsService.findOne(+id);
    const { accessory, ...rest } = session;

    return {
      ...rest,
      accessoryId: accessory.id,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    await this.sessionsService.update(+id, updateSessionDto);
    return {
      msg: 'update success',
      id,
    };
  }

  @Delete(':id')
  remove(@Param('id') id?: string) {
    if (id) return this.sessionsService.remove(+id);
    return this.sessionsService.removeAll();
  }
}
