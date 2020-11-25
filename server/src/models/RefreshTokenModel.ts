import {
  Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';
import User from './UserModel';

@Entity('allow_list_refresh_token')
export default class RefreshToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token: string;

  @Column()
  expires_in: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
