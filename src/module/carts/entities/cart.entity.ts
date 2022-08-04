import { Field, ObjectType } from '@nestjs/graphql';
import { CartType } from 'src/common/constants/cart.enum';
import { Product } from 'src/module/products/entities/product.entity';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('carts')
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'enum', enum: CartType, default: CartType.UNPICK })
  @Field()
  status: CartType;

  @Column({ type: 'int' })
  @Field()
  total: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
