import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";


interface IRequest{
    name: string,
    password: string,
    email: string,
    driver_license: string
}

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name, password, email, driver_license}:ICreateUserDTO): Promise<void>{
        
        //validando se o email cadastrado já existe
        const userAlreadyExist = await this.usersRepository.findByEmail(email);

        if(userAlreadyExist){
            throw new Error("O email já existe em nossos cadastros. Utilize outro email ou faça login")
        }

        //Criptografando senha no banco
        const passwordHash = await hash(password, 8)
        
        await this.usersRepository.create({
            name, 
            password: passwordHash, 
            email, 
            driver_license
        })
    }
}

export {CreateUserUseCase}
