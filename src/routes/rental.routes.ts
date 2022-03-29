import { Router } from 'express';
import { ensureAuthenticated } from 'src/middlewares/ensureAuthenticated';
import { CreateRentalController } from 'src/modules/rentals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from 'src/modules/rentals/useCases/DevolutionRental/DevolutionRentalController';
const rentalRoute = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoute.post('/', ensureAuthenticated,  createRentalController.handle)
rentalRoute.post('/devolution/:id', ensureAuthenticated,  devolutionRentalController.handle)

export{rentalRoute}