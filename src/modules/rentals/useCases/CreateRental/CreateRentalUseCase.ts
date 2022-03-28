
import { AppErrors } from "src/errors/AppErrors";
import { ICarsRepository } from "src/modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "src/shared/container/providers/dateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";


interface IRequest{
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository

    ){}

    async execute({ car_id, user_id, expected_return_date}: IRequest): Promise<Rental>{
        const minimunHour = 24;
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppErrors("Car unavailable")
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if(rentalOpenToUser){
            throw new AppErrors("There's a rental in progress for user")
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(expected_return_date, dateNow)

        if(compare < minimunHour){
            throw new AppErrors("Invalid return time")
        }

        const rental = await this.rentalsRepository.create({
            car_id, 
            user_id, 
            expected_return_date
        })

        await this.carsRepository.updateAvailable(car_id, false)
        return rental;
    }
}

export {CreateRentalUseCase}