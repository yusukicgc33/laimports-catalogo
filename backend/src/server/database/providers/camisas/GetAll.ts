import { ICamisa } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (page: number, limit: number, filter: string): Promise<ICamisa[] | Error> => {
    try {
        const result = await Knex('camisa')
            .select('*')
            .where('selecao', 'like', `%${filter}%`)
            .orWhere('liga', 'like', `%${filter}%`)

            .offset((page - 1) * limit)
            .limit(limit)

        return result
    }catch(error){
        console.log(error);
        return new Error('Erro ao consultar os registros')
    }
}