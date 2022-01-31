import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";


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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        // Verifica se usuário existe
        const user = await this.usersRepository.findByEmail(email)
        if(!user){
            throw new Error("Email ou senha incorretos")
        }

        // Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new Error("Email ou senha incorretos")
        }

        // Gera o Jsonwebtoken
        const token = sign({}, "a2932b34ec541c8b99f682f9b813f3b7", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn; 
    }
}

export {AuthenticateUserUseCase}