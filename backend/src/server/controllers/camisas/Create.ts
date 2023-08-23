import {Request, Response} from 'express'
import { CamisasProvider } from '../../database/providers/camisas';
import { ICamisa } from '../../database/models';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<ICamisa, 'id'>{}

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body.liga);
    
    let bodyCusto = String(req.body.custo)
    let bodyLiga = String(req.body.liga)

    let ligaLower = bodyLiga.toLocaleLowerCase()
    let custoUpper = bodyCusto.toUpperCase().replace(' ', '')
    req.body.liga = ligaLower
    req.body.custo = custoUpper

    if(!custoUpper.includes('R$')) {
        req.body.custo = `R$${custoUpper}`
    }
    if (!custoUpper.includes(',')){
        req.body.custo = `${req.body.custo},00`
    }

    const result = await CamisasProvider.create(req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        })
    }
    return res.status(StatusCodes.CREATED).json(result)
};