import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfigOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'username',
  password: 'password',
  database: 'product-shop',
  synchronize: true,
  entities: [],
  charset: 'utf8mb4',
};
