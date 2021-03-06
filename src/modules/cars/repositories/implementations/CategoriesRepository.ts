import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{
    private repository: Repository<Category>;

    //Tornamos o construtor privado para que não seja acessao fora da classe para ser instanciado
     constructor(){
       this.repository = getRepository(Category)
    }

/*
    public static getInstance(): CategoriesRepository{
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }   */
    
    async findByName(name: string): Promise<Category>{
        //select * from categories where name = 'name' limit 1
        const category = await this.repository.findOne({name});
        return category;
    }

    async create({description, name}: ICreateCategoryDTO) : Promise<void>{
        const category = this.repository.create({
            description, 
            name
        })
    
        await this.repository.save(category)
    }

    async list(): Promise<Category[]>{
        const categories = await this.repository.find();
        return categories;
    }



}

export {CategoriesRepository}