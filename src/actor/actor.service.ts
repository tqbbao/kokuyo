import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entity/actor.entity';
import { In, Repository } from 'typeorm';
import { CreateActorDTO } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  // create findall method
  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.find();
  }

  // create findbyid method
  async findById(id: number): Promise<Actor> {
    return await this.actorRepository.findOne({
      where: {
        actorId: id,
      },
    });
  }

  // create a actor method
    async createActor(data: CreateActorDTO): Promise<Actor> {
        const actor = await this.actorRepository.create(data);
        return await this.actorRepository.save(actor);
    }

}
