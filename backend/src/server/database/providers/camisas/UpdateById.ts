import { Knex } from "../../knex"
import { ICamisa } from "../../models"

export const updateById = async (id: number, camisa: Omit<ICamisa, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex('camisa')
            .update(camisa)
            .where('id', '=', id)
        if (result > 0) return
        return new Error('Erro ao atualizar registro')
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro')
    }
}