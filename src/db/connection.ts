import 'reflect-metadata';
import 'colors';
import { DataSource } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../constants/env';
import { get } from 'node-emoji';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10) || 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/entities/*.ts', __dirname + '/entities/*.js'],
  synchronize: true,
  logging: true,
  migrations: [__dirname + '/migrations/*.ts', __dirname + '/migrations/*.js'],
  migrationsRun: true,
});

export const DBconnection = async (): Promise<DataSource> => {
  await AppDataSource.initialize()
    .then(async () => {
      console.log(`${get('white_check_mark')} ${'Database'.green} ${'connected'.green}`);
    })
    .catch((err) => {
      console.log(`${get('x')} ${'Database'.red} ${'connection failed'.red}`);
      console.log(err);
    });

  return AppDataSource;
};
