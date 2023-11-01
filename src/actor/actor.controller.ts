import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { Request, Response } from 'express';
import { CreateActorDTO } from './dto/create-actor.dto';

@Controller('actor')
export class ActorController {
  constructor(private actorService: ActorService) {}

  @HttpCode(200)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const actors = await this.actorService.findAll();
    if (!actors) {
      return res.status(404).json({
        message: 'not found',
      });
    }

    res.status(200).json({
      message: 'success',
      data: actors,
    });
  }

  @HttpCode(200)
  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const actor = await this.actorService.findById(id);
    if (!actor) {
      return res.status(404).json({
        message: 'not found',
      });
    }

    res.status(200).json({
      message: 'success',
      data: actor,
    });
  }

  @HttpCode(200)
  @Post()
  async createActor(
    @Body() data: CreateActorDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const actor = await this.actorService.createActor(data);
    res.status(200).json({
      message: 'success',
      data: actor,
    });
  }
}
