import {
  Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Orphanage from './OrphanageModel';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.user)
  @JoinColumn({ name: 'user_id' })
  orphanages: Orphanage[];
}
