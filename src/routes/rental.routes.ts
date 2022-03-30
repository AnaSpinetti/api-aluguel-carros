import { Router } from 'express';
import { ensureAuthenticated } from 'src/middlewares/ensureAuthenticated';
import { CreateRentalController } from 'src/modules/rentals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from 'src/modules/rentals/useCases/DevolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from 'src/modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
const rentalRoute = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoute.post('/', ensureAuthenticated,  createRentalController.handle)
rentalRoute.post('/devolution/:id', ensureAuthenticated,  devolutionRentalController.handle)
rentalRoute.get('/user', ensureAuthenticated,  listRentalsByUserController.handle)

export{rentalRoute}