import { Knex } from "knex";
import path from 'path';

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done()
        }
    }
}
export const production: Knex.Config = {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
       host: process.env.DBHOST,
       port: Number(process.env.DBPORT),
       database: process.env.DBNAME,
       userName: process.env.DBUSERNAME,
       password: process.env.DBPASSWORD,
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done()
        }
    }
}