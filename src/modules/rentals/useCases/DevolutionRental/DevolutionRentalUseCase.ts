import { ICarsRepository } from "src/modules/cars/repositories/ICarsRepository"
import { inject } from "tsyringe"
import { CannotExecuteNotConnectedError } from "typeorm"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"

interface IRequest{
    id: string,
    user_id: string
}

class DevolutionRentalUseCase{
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository

}

async execute({id, user_id}: I Request){
    const rental = await this.repository
}

export{DevolutionRentalUseCase}