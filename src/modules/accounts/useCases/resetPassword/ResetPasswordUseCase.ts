import { AppErrors } from "src/errors/AppErrors";
import { IDateProvider } from "src/shared/container/providers/dateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { hash} from "bcryptjs";


interface IRequest{
    token: string;
    password: string
}

@injectable()
class ResetPasswordUseCase{
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider") private dateProvider: IDateProvider,
        // @inject("MailProvider") private mailProvider: IMailProvider
    
    ){}
    async execute({token, password} : IRequest): Promise<void>{
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)
        
        if(!userToken){
            throw new AppErrors("Token invalid")
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppErrors("Token expired")
        }

        const user = await this.usersRepository.findById(userToken.user_id)
        user.password = await hash(password, 8)
        await this.usersRepository.create(user)
        await this.usersTokensRepository.deleteById(userToken.id)
    }
}

export {ResetPasswordUseCase}