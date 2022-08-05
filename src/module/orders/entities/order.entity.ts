import { Field, ObjectType } from '@nestjs/graphql';
import { OrderType } from 'src/common/constants/order.enum';
import { Cart } from 'src/module/carts/entities/cart.entity';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'int' })
  @Field()
  totaPrice: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  description: string;

  @Column({ type: 'enum', enum: OrderType, default: OrderType.WAITING })
  @Field()
  status: OrderType;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Cart, (cart) => cart.order)
  cart: Cart[];
}
