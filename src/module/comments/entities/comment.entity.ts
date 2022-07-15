import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('comments')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  content: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
