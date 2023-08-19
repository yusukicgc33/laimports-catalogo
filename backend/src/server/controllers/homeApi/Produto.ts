import { Request, Response } from "express";

export const produto = async (req: Request, res: Response) => {
    res.render('produto')
}