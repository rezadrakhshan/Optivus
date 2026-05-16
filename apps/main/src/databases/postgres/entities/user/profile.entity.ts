import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { User } from './user.entity';

@Entity()
export class Profile extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column({ unique: true, nullable: true })
  email: string;
  @Column({ nullable: true })
  position: string;
  @Column({ nullable: true })
  company: string;
  @Column({ nullable: true })
  location: string;
  @Column({ default: '' })
  image: string;
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
