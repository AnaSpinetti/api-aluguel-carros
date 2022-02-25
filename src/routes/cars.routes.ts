import { Router } from "express";
import { CreateCarSpecificationController } from "src/modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "src/modules/cars/useCases/ListCar/ListCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/CreateCar/CreateCarController";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export {carsRoutes}