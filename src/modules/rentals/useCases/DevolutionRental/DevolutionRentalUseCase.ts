import { inject } from "tsyringe"
import { ICarsRepository } from "src/modules/cars/repositories/ICarsRepository"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"
import { AppErrors } from "../../../../errors/AppErrors"
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider"
import { CustomRepositoryCannotInheritRepositoryError } from "typeorm"

interface IRequest{
    id: string,
    user_id: string
}


class DevolutionRentalUseCase{
    constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("DayJsDateProvider") private dateProvider: IDateProvider
    ){}
    
    async execute({id, user_id}: IRequest){
        const rental = await this.rentalsRepository.findById(id)
        const car = await this.carsRepository.findById(id)

        if(!rental){
            throw new AppErrors("Rental does not exists")
        }

        const dateNow = this.dateProvider.dateNow();
        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow())
        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

        if(daily <= 0){
            daily = 1;
        }

        let total = 0

        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);
    }
}
    
export{DevolutionRentalUseCase}