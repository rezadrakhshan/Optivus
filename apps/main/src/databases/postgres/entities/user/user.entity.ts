import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { Profile } from './profile.entity';
import { profile } from 'console';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  phone: string;
  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: Profile;
}
