import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest{
    car_id: string,
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase{

    constructor(
        @inject("CarsRepository") 
        private carsRepository: ICarsRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<void>{
        const carExists = await this.carsRepository.findByID(car_id)
    }
}

export {CreateCarSpecificationUseCase}