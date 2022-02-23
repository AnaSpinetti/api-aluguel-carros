import { Router } from "express";
import { ListCarsController } from "src/modules/cars/useCases/ListCar/ListCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/CreateCar/CreateCarController";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsUseCase = new ListCarsController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsUseCase.handle)

export {carsRoutes}