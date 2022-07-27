import { Field, ObjectType } from '@nestjs/graphql';
import { OrderType } from 'src/common/constants/order.enum';
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

  @Column({ type: 'enum', enum: OrderType, default: OrderType.WAITING })
  status: OrderType;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => User)
  user: User;
}
