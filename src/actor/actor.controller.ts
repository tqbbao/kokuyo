import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('actor')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
export class ActorController {
  constructor(private actorService: ActorService) {}

  @HttpCode(200)
  @Get()
  async findAll() {
    const actors = await this.actorService.findAll();
    if (!actors) {
      throw new NotFoundException('Actors not found');
    }
    return { message: 'success', data: actors };
  }

  @HttpCode(200)
  @Get('/:id')
  @UseGuards(AuthGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    console.log('Hai...')
    const actor = await this.actorService.findById(id);
    if (!actor) {
        throw new NotFoundException('Actor not found');
    }
    return { message: 'success', data: actor };
  }

  @HttpCode(200)
  @Post()
  async createActor(
    @Body() data: CreateActorDTO,
  ) {
    const actor = await this.actorService.createActor(data);
    return { message: 'success', data: actor };
  }

  @HttpCode(200)
  @Patch('/:id')
  async updateActor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateActorDTO,
  ) {
    const actor = await this.actorService.updateActor(id, data);
    return { message: 'success', data: actor };
  }
}
