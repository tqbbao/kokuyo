import { Module } from '@nestjs/common';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/entity/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorController],
  providers: [ActorService]
})
export class ActorModule {}
