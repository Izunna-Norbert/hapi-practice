import 'reflect-metadata'
import 'colors'
import { DataSource } from 'typeorm'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../constants/env'
import { get } from 'node-emoji';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10) || 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [__dirname + '/entities/*.ts'],
    synchronize: true,
    logging: true,
    // migrations: [__dirname + '/migrations/*.ts'],
    // migrationsRun: true,
});

export const DBconnection = async (): Promise<DataSource> => {


    await AppDataSource.initialize().then(async () => {
        console.log(`${get('white_check_mark')} ${'Database'.green} ${'connected'.green}`)

        // Creating fake data
        // console.log(`${get('hourglass')} ${'Creating'.yellow} ${'fake data'.yellow}`)
        // await fakeFieldsStore(AppDataSource.manager)
    }).catch((err) => {
        console.log(`${get('x')} ${'Database'.red} ${'connection failed'.red}`)
        console.log(err)
    });
    // await AppDataSource.runMigrations().then((data) => {
    //     console.log(`${get('white_check_mark')} ${'Database'.green} ${'migrations'.green} ${'run'.green}`)
    // }).catch((err) => {
    //     console.log(`${get('x')} ${'Database'.red} ${'migrations failed'.red}`)
    //     console.log(err)
    // });


    return AppDataSource;
};
