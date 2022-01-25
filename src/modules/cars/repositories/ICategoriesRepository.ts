import { Category } from "../models/Category";

interface ICreateCategoryDTO{
    name: string,
    description: string
}

interface ICategoriesRepository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({description, name}: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO }