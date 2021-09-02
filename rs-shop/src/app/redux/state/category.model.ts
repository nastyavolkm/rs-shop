import { ISubCategory } from "./subcategory.model";

export interface ICategory {
    id: string,
    name: string,
    subCategories: ISubCategory[]
}