import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../entities/Category";


class ListCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute(): Category[]{
        const categories = this.categoriesRepository.list();
        return categories;
    }
}

export {ListCategoryUseCase}