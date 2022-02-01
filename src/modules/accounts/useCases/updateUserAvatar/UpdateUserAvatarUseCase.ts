import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest{
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase{
    constructor(
        @inject("UsersRepository") 
        private UsersRepository: IUsersRepository
    ){}
    
    async execute({user_id, avatarFile}: IRequest) : Promise<void>{
        const user = await this.UsersRepository.findById(user_id);
        user.avatar = avatarFile;

        await this.UsersRepository.create(user);
    }
}

export{UpdateUserAvatarUseCase}