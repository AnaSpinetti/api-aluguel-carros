import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppErrors } from "../../../../errors/AppErrors";
import auth from "src/config/auth";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "src/shared/container/providers/dateProvider/IDateProvider";


interface IRequest{
    email: string,
    password: string
}

interface IResponse{
    user: {
        name: string,
        email: string
    };
    token: string
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider
    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        // Verifica se usuário existe
        const user = await this.usersRepository.findByEmail(email)
        if(!user){
            throw new AppErrors("Email ou senha incorretos", 401)
        }

        // Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppErrors("Email ou senha incorretos", 401)
        }

        // Gera o Jsonwebtoken
        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(auth.expires_refresh_token_days)

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }

        return tokenReturn; 
    }
}

export {AuthenticateUserUseCase}