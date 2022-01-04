import { Specification } from "../models/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "./ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository{
    private specifications: Specification[];

    constructor(){
        this.specifications = [];
    }

    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name, 
            description,
            created_at: new Date()
        })

        this.specifications.push(specification)
    }
}