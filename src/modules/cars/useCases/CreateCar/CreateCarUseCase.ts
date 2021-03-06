import { AppErrors } from "../../../../errors/AppErrors";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
        ){}

    async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<void> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate) 
        
        if(carAlreadyExists){
            throw new AppErrors("Car already exists!");
        }

        await this.carsRepository.create({name, description, daily_rate, license_plate, fine_amount, brand, category_id })
    }
}

export { CreateCarUseCase }