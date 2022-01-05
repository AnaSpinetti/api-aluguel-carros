import { Category } from "../../models/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";



class CategoriesRepository implements ICategoriesRepository{
    private categories: Category[];
    
    //Singleton - Instancia Global
    private static INSTANCE: CategoriesRepository;

    //Tornamos o construtor privado para que não seja acessao fora da classe para ser instanciado
    private constructor(){
        this.categories = [];
    }

    // Responsavewl por criar uma instancia da classe ou repassar uma instacia já existente para quem requisitar

public static getInstance(): CategoriesRepository{
    if(!CategoriesRepository.INSTANCE){
        CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
}
    
    findByName(name: string): Category{
        const category = this.categories.find(category => category.name === name);
        return category;
    }

    create({description, name}: ICreateCategoryDTO) : void{
        const category = new Category()
    
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
    
        this.categories.push(category);
    }

    list(): Category[]{
        return this.categories;
    }



}

export {CategoriesRepository}