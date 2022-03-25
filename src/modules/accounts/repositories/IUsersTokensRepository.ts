import { ICreateUsertokenDTO } from "../dtos/ICreateUsertokenDTO";
import { UserTokens } from "../entities/UserTokens";

interface IUsersTokensRepository{
    create({expires_date, refresh_token, user_id}: ICreateUsertokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository }

