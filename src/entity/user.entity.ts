import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GHOST = 'ghost',
}
@Entity('user', { schema: 'kokuyo' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'user_id',
    unsigned: true,
  })
  userId: number;

  @Column('varchar', { unique: true, name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole;

  @Column('varchar', { nullable: true, name: 'refresh_token', length: 255 })
  refreshToken: string;
}


