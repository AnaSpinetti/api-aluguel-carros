import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user;
    }
    async create({name, password, driver_license, email}: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({
            name,
            password, 
            driver_license, 
            email
        })

        await this.repository.save(user)
    }
}

export {UsersRepository}