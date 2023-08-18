import { ICamisa } from '../../models';
import { Knex } from '../../knex';

export const getById = async (id: number): Promise<ICamisa | Error> => {
    try {
        const result = await Knex('camisa')
            .select('*')
            .where('id', '=', id)
            .first()

        if(result) return result

        return new Error('Registro não encontrado')
    } catch (error) {
        return new Error('O registro não foi encontrado')
    }
}