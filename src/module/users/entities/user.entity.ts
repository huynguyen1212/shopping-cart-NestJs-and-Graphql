import { Field, ObjectType } from '@nestjs/graphql';
import { Cart } from 'src/module/carts/entities/cart.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RoleType } from '../user.enum.';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  @Field()
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field()
  password: string;

  @Column({ type: 'varchar', length: 20 })
  // @Field()
  name: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  @Field()
  role: RoleType;

  @UpdateDateColumn()
  // @Field()
  updated: Date;

  @CreateDateColumn()
  // @Field()
  created: Date;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}
