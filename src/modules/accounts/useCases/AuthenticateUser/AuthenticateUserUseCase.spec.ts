import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO ={
            driver_license: "01234",
            email: "teste@teste.com",
            password: "1234",
            name: "User Teste"
        };
        
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })
})