import { ICamisa } from "../../models";

declare module 'knex/types/tables' {
    interface Tables{
        camisa: ICamisa,
    }
}