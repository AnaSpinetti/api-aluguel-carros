import { ICreateUsertokenDTO } from "../dtos/ICreateUsertokenDTO";
import { UserTokens } from "../entities/UserTokens";

interface IUsersTokensRepository{
    create({expires_date, refresh_token, user_id}: ICreateUsertokenDTO): Promise<UserTokens>;
    findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens>;
    deleteById(user_id: string): Promise<void>;
}

export { IUsersTokensRepository }

