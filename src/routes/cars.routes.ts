import { Router } from "express";
import multer from "multer";
import { CreateCarSpecificationController } from "src/modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../../src/modules/cars/useCases/ListCar/ListCarsController";
import { UploadCarImageController } from "../../src/modules/cars/useCases/UploadCarImage/UploadCarImageController";
import uploadConfig from "../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/CreateCar/CreateCarController";

const upload = multer(uploadConfig.upload("./tmp/cars"))


const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)

export {carsRoutes}