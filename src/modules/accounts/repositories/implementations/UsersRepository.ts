import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user;
    }
    async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({username})
        return user;
    }
    async create({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({
            name,
            username, 
            password, 
            driver_license, 
            email
        })

        await this.repository.save(user)
    }
}
0
export {UsersRepository}