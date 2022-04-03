import { AppErrors } from "src/errors/AppErrors";
import {resolve} from "path";
import { IDateProvider } from "src/shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "src/shared/container/providers/mailProvider/IMailProvider";
import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase{
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider") private dateProvider: IDateProvider,
        @inject("MailProvider") private mailProvider: IMailProvider
    
    ){}
    async execute(email: string): Promise<void>{
        const user = await this.usersRepository.findByEmail(email)
        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

        if(!user){
            throw new AppErrors("User not found")
        }

        const expires_date = this.dateProvider.addHours(3);
        const token = uuidV4();
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        })

        const variables = {
            name: user.name,
            link: `http://localhost:3333/password/reset?token=${token}`
        }

        await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)
    }
}

export{SendForgotPasswordMailUseCase}