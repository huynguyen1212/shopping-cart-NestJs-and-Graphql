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

  @Column({ type: 'varchar', length: 20 })
  @Field({ nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  @Field({ nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Field({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  @Field({ nullable: true })
  role: RoleType;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}
