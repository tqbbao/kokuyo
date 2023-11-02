import { Exclude } from "class-transformer";
import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity("actor", { schema: "kokuyo" })
  export class Actor {
    @PrimaryGeneratedColumn({
      type: "smallint",
      name: "actor_id",
      unsigned: true,
    })
    actorId: number;
  
    @Column("varchar", { name: "first_name", length: 45 })
    @Exclude()
    firstName: string;
  
    @Column("varchar", { name: "last_name", length: 45 })
    lastName: string;
  
    @Column("timestamp", {
      name: "last_update",
      default: () => "CURRENT_TIMESTAMP",
    })
    lastUpdate: Date;
  
    // @OneToMany(() => FilmActor, (filmActor) => filmActor.actor)
    // filmActors: FilmActor[];
  }
  