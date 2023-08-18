import { CamisasProvider } from "../../database/providers/camisas";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Knex } from "../../database/knex";

interface IParamsProps {
    id?: number;
}

export const deleteById = async (req: Request<IParamsProps, {}, {}, {}>, res: Response) => {
    console.log(req.params);
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "Id" precisa ser informado'
            }
        });
    }

    const result = await CamisasProvider.deleteById(req.params.id)
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: result.message
          }
        });
      }
    
      return res.status(StatusCodes.NO_CONTENT).send();
}