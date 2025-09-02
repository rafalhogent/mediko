import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.configDotenv();

export const dataSourceOptions: DataSourceOptions = {
  type:
    (process.env.DB_TYPE && process.env.DB_TYPE == 'mysql') ||
    process.env.DB_TYPE == 'mariadb'
      ? process.env.DB_TYPE
      : 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3000'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [process.env.ENTITIES_PATH ?? 'dist/**/*.entity.js'],
  migrations: [process.env.MIGRATIONS_PATH ?? 'dist/db/migrations/*.js'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
