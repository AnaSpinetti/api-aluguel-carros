import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
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
        
        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }

        user.avatar = avatarFile;

        await this.UsersRepository.create(user);
    }
}

export{UpdateUserAvatarUseCase}