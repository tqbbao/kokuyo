import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entity/actor.entity';
import { Not, Repository } from 'typeorm';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  // create findall method
  async findAll() {
    return await this.actorRepository.find();
  }
  // create findbyid method
  async findById(id: number) {
    return await this.actorRepository.findOne({
      where: {
        actorId: id,
      },
    });
  }

  // create a actor method
  async createActor(data: CreateActorDTO) {
    const actor = await this.actorRepository.create(data);
    return await this.actorRepository.save(actor);
  }

  // create a update method
  async updateActor(id: number, data: UpdateActorDTO) {
    let actor = await this.findById(id);
    if (!actor) {
      throw new NotFoundException('Actor not found');
    }
    actor = { ...actor, ...data };
    await this.actorRepository.save(actor);

    return actor;
  }

  async test()
  {
    return await this.actorRepository
    .createQueryBuilder('actor')
    .where('actor.actorId = :id', { id: 1 })
    .getOne();

  }
}
