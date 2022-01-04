import { Category } from "../models/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category {
        return null;
    }
    list(): Category[] {
        return null;
    }
    create({ description, name }: ICreateCategoryDTO): void {
        console.log(name, description)
    }
    
}