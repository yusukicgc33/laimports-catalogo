import { ICamisa } from "../../models";
import { Knex } from "../../knex";

export const create = async (camisa: Omit<ICamisa, 'id'>): Promise<number | Error> => {
    try {
        camisa.liga.toLowerCase()
        const [result] = await Knex('camisa').insert(camisa).returning('id');
        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        }
        return new Error('Erro ao cadastrar camisa')
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar camisa')
    }
}