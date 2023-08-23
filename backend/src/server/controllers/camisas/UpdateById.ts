import { Request, Response } from 'express'
import { ICamisa } from '../../database/models'
import { StatusCodes } from 'http-status-codes';
import { CamisasProvider } from '../../database/providers/camisas';

interface IParamsProps {
    id?: number
}
interface IBodyProps extends Omit<ICamisa, 'id'> { }

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps, {}>, res: Response) => {
    console.log(req.params);
    console.log(req.body);
    
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

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "Id" precisa ser informado'
            }
        });
    }

    const result = await CamisasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
}