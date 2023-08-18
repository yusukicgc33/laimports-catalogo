import { Knex } from "../../knex"

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex('camisa')
            .where('id', '=', id)
            .del();
        if(result > 0) return
        return new Error('Erro ao apagar registro')
    } catch (error) {
        console.log(error);
        return new Error('Ocorreu um erro ao apagar registro')
    }
}