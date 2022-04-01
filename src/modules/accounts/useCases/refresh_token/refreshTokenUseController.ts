import {Request, Response} from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

class RefreshTokenUseController{
    async handle(req: Request, res: Response): Promise<Response>{
        const token = 
        req.body.token || 
        req.headers["x-access-token"] || 
        req.query.token;
        
        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
        const refresh_token = await refreshTokenUseCase.execute(token);

        return res.json(refresh_token)
        
    }
}

export {RefreshTokenUseController}
