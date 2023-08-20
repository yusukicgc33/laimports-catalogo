import { Request, Response } from "express";
import { CamisasProvider } from "../../database/providers/camisas";

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string,
}

let props = {
    page: 1,
    limit: 10,
    filter: ''
}

export const produto = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);

    const result = await CamisasProvider.getAll(req.query.page || props.page, req.query.limit || props.limit, req.query.filter || props.filter)
    let cards: any =[]

    if(result instanceof Error){cards = ['erro']}

    cards.push(Object.values(result))
    console.log(cards);
    
    res.render('produto', {
        cards: cards,
        page: req.query.page,
        limit: req.query.limit,
        filter: req.query.filter
    })
}