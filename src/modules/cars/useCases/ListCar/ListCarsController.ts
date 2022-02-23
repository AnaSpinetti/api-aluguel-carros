import {Request, Response} from 'express';
import { container } from 'tsyringe';
import { ListCarsUseCase } from './ListCarsUseCase';

class ListCarsController{
    async handle(req: Request, res: Response): Promise<Response>{
        const {brand, name, category_id} = req.query;

        const listAvailableCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listAvailableCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string
        });

        return res.json(cars)
    }
}

export {ListCarsController}