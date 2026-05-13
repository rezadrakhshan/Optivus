import { Entity, Column } from 'typeorm';
import { AbstractEntity  } from '../abstract.entity';

@Entity()
export class User extends AbstractEntity  {
  @Column({ unique: true })
  phone: string;
}
