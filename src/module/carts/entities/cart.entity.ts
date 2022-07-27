import { Field, ObjectType } from '@nestjs/graphql';
import { CartType } from 'src/common/constants/cart.enum';
import { Product } from 'src/module/products/entities/product.entity';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('carts')
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  description: string;

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

  @ManyToMany(() => Product)
  @JoinTable()
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
