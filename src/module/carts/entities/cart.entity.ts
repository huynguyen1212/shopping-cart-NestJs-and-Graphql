import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/module/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';

@Entity('carts')
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  description: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  product: Product;
}
