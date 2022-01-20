import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../models/Category";


class ListCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute(): Category[]{
        const categories = this.categoriesRepository.list();
        return categories;
    }
}

export {ListCategoryUseCase}