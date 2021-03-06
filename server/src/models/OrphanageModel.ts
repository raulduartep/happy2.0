import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne,
} from 'typeorm';
import Image from './ImageModel';
import User from './UserModel';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  whatsapp: string;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  pending: boolean;

  @ManyToOne(() => User, (user) => user.orphanages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[]
}
