import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'kokuyo' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'user_id',
    unsigned: true,
  })
  userId: number;

  @Column('varchar', { name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'password', length: 45 })
  password: string;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;
  
}
