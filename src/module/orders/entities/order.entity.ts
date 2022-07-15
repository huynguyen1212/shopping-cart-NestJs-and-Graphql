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

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  description: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
