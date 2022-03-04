import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "../../modules/cars/repositories/implementations/CarsRepository";
import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { ICarsImageRepository } from "../../modules/cars/repositories/ICarsImageRepository";
import { CarsImageRepository } from "../../modules/cars/repositories/implementations/CarsImageRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "../../modules/rentals/repositories/implementations/RentalsRepository";


container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationRepository>("SpecificationRepository", SpecificationRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImageRepository>("CarsImageRepository", CarsImageRepository);
container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository);