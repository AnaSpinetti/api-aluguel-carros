import { User } from "../entities/User";
interface ICreateUserDTO{
    name: string,
    username: string,
    password: string,
    email: string,
    driver_license: string
}

interface IUsersRepository{
    findByEmail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    create({name, username, password, email, driver_license}: ICreateUserDTO): Promise<void>
}

export { IUsersRepository, ICreateUserDTO}

