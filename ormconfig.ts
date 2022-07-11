import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfigOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '',
  port: 3307,
  username: 'sammy',
  password: 'password',
  database: 'product-shop',
  synchronize: true,
  charset: 'utf8mb4',
  logging: true,
  autoLoadEntities: true,
  // entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/database/migrations/*.js'],
  // subscribers: ['dist/database/subscriber/*.js'],
};
