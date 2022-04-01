import { sign, verify } from "jsonwebtoken";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import auth from "src/config/auth";
import { inject, injectable } from "tsyringe";
import { AppErrors } from "src/errors/AppErrors";
import { IDateProvider } from "src/shared/container/providers/dateProvider/IDateProvider";

interface IPayload{
    sub: string;
    email: string;
}
@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider") private dayJsDateProvider: IDateProvider
        )  {}

    async execute(token: string): Promise<string> {
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload;
        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndToken(user_id, token);
    
        if(!userToken){
            throw new AppErrors("Refresh Token Error!")
        }

        await this.usersTokensRepository.deleteById(userToken.id);
        const refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        const expires_date = this.dayJsDateProvider.addDays(auth.expires_refresh_token_days)

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return refresh_token

        

    }
}

export {RefreshTokenUseCase}