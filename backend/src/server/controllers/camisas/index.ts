import * as create from './Create';
import * as deleteById from './DeleteById'
import * as getById from './GetById'
import * as getAll from './GetAll'
import * as updateById from './UpdateById'

export const CamisasController = {
    ...create,
    ...deleteById,
    ...getById,
    ...getAll,
    ...updateById
};