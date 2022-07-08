import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfigOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '',
  port: 3307,
  username: 'sammy',
  password: 'password',
  database: '',
  synchronize: true,
  entities: [],
  charset: 'utf8mb4',
};
