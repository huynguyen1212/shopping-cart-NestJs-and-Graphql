import { ConnectionOptions } from 'typeorm';
// import './polyfill';

const ormConfigOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'product-shop',
  synchronize: true,
  entities: [],
  charset: 'utf8mb4',
};

export = ormConfigOptions;
