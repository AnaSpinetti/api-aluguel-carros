import { Router } from 'express';
import { ensureAuthenticated } from 'src/middlewares/ensureAuthenticated';
import { CreateRentalController } from 'src/modules/rentals/useCases/CreateRental/CreateRentalController';
const rentalRoute = Router();

const createRentalController = new CreateRentalController();

rentalRoute.post('/', ensureAuthenticated,  createRentalController.handle)

export{rentalRoute}