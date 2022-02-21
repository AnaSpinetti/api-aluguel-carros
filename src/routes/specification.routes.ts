import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

 
specificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export {specificationRoutes}