import { getRepository, Repository } from "typeorm";
import { ICreateUsertokenDTO } from "../../dtos/ICreateUsertokenDTO";
import { UserTokens } from "../../entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository{
    private repository: Repository<UserTokens>;

    constructor(){
        this.repository = getRepository(UserTokens)
    }
    async findByRefreshToken(token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOne(token)

        return userToken;
    }
    async deleteById(id: string) {
        await this.repository.delete(id)
    }
    async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({user_id, refresh_token})
        return usersTokens
    }

    async create({expires_date, refresh_token, user_id}: ICreateUsertokenDTO): Promise<UserTokens> {
        const userToken = await this.repository.create({
            expires_date,
            refresh_token, 
            user_id
        })

        await this.repository.save(userToken)

        return userToken;
    }
}

export {UsersTokensRepository}