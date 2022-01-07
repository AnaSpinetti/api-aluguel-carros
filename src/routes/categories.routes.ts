import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/models/useCases/CreateCategory';
import { importCategoryController } from '../modules/cars/models/useCases/importCategories';
import { listCategoriesController } from '../modules/cars/models/useCases/ListCategories';

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res);
})

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);    
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoryController.handler(req, res);
})

export{ categoriesRoutes }