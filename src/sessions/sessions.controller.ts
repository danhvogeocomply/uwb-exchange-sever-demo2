import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import {
  CreateSessionDto,
  CreateSessionResponseDto,
} from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientName } from './entities/session.entity';
import { FindSessionByIdDto } from './dto/find-session-by-id.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create session successfully.',
    type: CreateSessionResponseDto,
  })
  async create(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<CreateSessionResponseDto> {
    const { status, id } = await this.sessionsService.create(createSessionDto);
    return {
      msg: 'create success',
      id,
      status: {
        [ClientName.MOBILE]: status[ClientName.MOBILE],
        [ClientName.ACCESSORY]: status[ClientName.ACCESSORY],
      },
    };
  }

  @Get(':id')
  @ApiFoundResponse({ type: FindSessionByIdDto })
  async findOne(@Param('id') id: string): Promise<FindSessionByIdDto> {
    const session = await this.sessionsService.findOne(+id);
    const { accessory, ...rest } = session;

    return {
      ...rest,
      accessoryId: accessory.id,
    };
  }

  @Put(':id')
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

  @Delete()
  @ApiOperation({ summary: 'Delete all sessions' })
  async removeAll() {
    await this.sessionsService.removeAll();
    return { msg: `all sessions deleted` };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session by ID' })
  async remove(@Param('id') id: string) {
    await this.sessionsService.remove(+id);
    return { msg: `session deleted with id = ${id}` };
  }
}
