import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date;
}
