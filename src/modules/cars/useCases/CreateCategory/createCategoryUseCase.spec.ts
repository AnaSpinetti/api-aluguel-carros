import { AppErrors } from "../../../../errors/AppErrors"
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description"
        }

        await createCategoryUseCase.execute({
            name: "Category Test",
            description: "Category description"
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id")
    })

    it("should not be able to create a new category with same name", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description"
            }

            await createCategoryUseCase.execute({
                name: "Category Test",
                description: "Category description"
            })

            await createCategoryUseCase.execute({
                name: "Category Test",
                description: "Category description"
            })
        }).rejects.toBeInstanceOf(AppErrors);
    })
})