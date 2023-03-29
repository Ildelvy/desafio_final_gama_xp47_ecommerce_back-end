import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UsuarioModel from "../../models/Usuario";

type JWTPayload = {
    id: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(404).json('Não autorizado!');
        }

        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.SECRET_KEY as string) as JWTPayload;

        const idExists = await UsuarioModel.findOne({ where: { id } });

        if (!idExists) {
            return res.status(400).json(`Não autorizado.`);
        }

        req.user = idExists;

    } catch (error) {
        return res.status(400).json(`Não autorizado: ${error} `);
    }

    next();
}