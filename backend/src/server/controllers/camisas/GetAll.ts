import { StatusCodes } from "http-status-codes";
import { CamisasProvider } from "../../database/providers/camisas";
import { Request, Response } from "express";

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string,
}

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);
    
    const result = await CamisasProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '')

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json({result})
}