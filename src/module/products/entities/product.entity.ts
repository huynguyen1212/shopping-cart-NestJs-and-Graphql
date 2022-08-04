import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/module/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'int' })
  @Field()
  price: number;

  @Column({ type: 'int' })
  @Field()
  total: number;

  @Column({ type: 'varchar', length: 20 })
  @Field()
  name: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => Category)
  category: Category;
}
