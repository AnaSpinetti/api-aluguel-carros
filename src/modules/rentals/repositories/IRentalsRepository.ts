import { ICreateRentalDTO } from "src/modules/cars/dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

interface IRentalsRepository{
    create(data: ICreateRentalDTO): Promise<Rental>
    findOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
    findById(id: string): Promise<Rental>
}

export {IRentalsRepository}