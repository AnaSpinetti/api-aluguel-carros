import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "src/config/auth";
import { UsersTokensRepository } from "src/modules/accounts/repositories/implementations/UsersTokensRepository";
import { AppErrors } from "../errors/AppErrors";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string,
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppErrors("Token não enviado", 401);
    }

    const [, token] = authHeader.split(" ")

    try {
        const {sub: user_id} = verify(token, auth.secret_token) as IPayload

        req.user = {
            id: user_id
        }

        next();

    } catch (error) {
        throw new AppErrors("Token inválido", 401);
    }
}