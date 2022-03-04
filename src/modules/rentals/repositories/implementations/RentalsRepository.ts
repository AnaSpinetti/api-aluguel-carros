import dayjs from "dayjs";
import { ICreateRentalDTO } from "src/modules/cars/dtos/ICreateRentalDTO";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepository implements IRentalsRepository{
    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }

    async create({
        car_id, 
        expected_return_date, 
        user_id
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date()
        })

        await this.repository.save(rental);
        return rental;
    }
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        await this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }

}

export {RentalsRepository}