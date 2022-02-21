import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../errors/AppErrors";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const {id} = req.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if(!user.isAdmin){
        throw new AppErrors("user isn't admin");
    }
    
    return next();
}