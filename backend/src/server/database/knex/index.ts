import knex from 'knex';
import { development, production } from './Enviroments';

const getEnviroment = () => {
    switch (process.env.ENVIROMENT) {
        case 'production':
            return production;
        default:
            return development;
    }
}

export const Knex = knex(getEnviroment())