import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './item.entity';
import { ItemResolver } from './item.resolver';

@Module({
  providers: [ItemResolver],
  imports: [TypeOrmModule.forFeature([ItemEntity])],
})
export class ItemModule {}
