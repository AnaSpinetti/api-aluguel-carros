import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response>{
        const {
            car_id, 
            user_id,
            start_date,
            end_date,
            expected_return_date,
            total
        } = req.body;

        const createRentalUseCase = container.resolve(CreateRentalUseCase)
        const rental = await createRentalUseCase.execute({
            car_id, 
            user_id,
            start_date,
            end_date,
            expected_return_date,
            total
        })

        return res.status(201).json(rental)
    }
}

export {CreateRentalController}