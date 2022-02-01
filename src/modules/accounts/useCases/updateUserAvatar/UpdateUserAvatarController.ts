import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(req: Request, res: Response){
        const {id} = req.user;
        const avatarFile = null

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
        await updateUserAvatarUseCase.execute({user_id: id, avatarFile})

        return res.status(204).send();
    }
}

export{UpdateUserAvatarController}