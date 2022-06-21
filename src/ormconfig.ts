import { ConnectionOptions } from 'typeorm';

export const ormConfigOptions: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3307,
  username: 'username',
  password: 'password',
  database: 'product-shop',
  synchronize: true,
  entities: [],
  charset: 'utf8mb4',
};
