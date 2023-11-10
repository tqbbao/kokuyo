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
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from 'src/entity/user.entity';
@Controller('actor')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
export class ActorController {
  constructor(private actorService: ActorService) {}

  @Get('/test')
  async test() 
  {
    return await this.actorService.test();
  }
  @Get('test2')
  async test2() 
  {
    return {
      data: 'test',
    }
  }
  
  @HttpCode(200)
  @Get()
  async findAll(@CurrentUser() currentUser: User) {
    console.log('Hai...')
    console.log(currentUser);
    const actors = await this.actorService.findAll();
    if (!actors) {
      throw new NotFoundException('Actors not found');
    }
    return { message: 'success', data: actors };
  }
  
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    console.log('Hai...')
    const actor = await this.actorService.findById(id);
    if (!actor) {
        throw new NotFoundException('Actor not found');
    }
    return { message: 'success', data: actor };
  }

  @HttpCode(201)
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
