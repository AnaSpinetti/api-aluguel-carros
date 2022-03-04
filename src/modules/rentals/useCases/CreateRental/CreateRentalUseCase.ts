import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppErrors } from "src/errors/AppErrors";
import { inject, injectable } from "tsyringe";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest{
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
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

        const expectReturnDateFormat = dayjs(expected_return_date).utc().local().format()
        const dateNow = dayjs().utc().local().format()
        const compare = dayjs(expectReturnDateFormat).diff(dateNow, "hours")


        if(compare < minimunHour){
            throw new AppErrors("Invalid return time")
        }

        const rental = await this.rentalsRepository.create({
            car_id, 
            user_id, 
            expected_return_date
        })

        return rental;
    }
}

export {CreateRentalUseCase}