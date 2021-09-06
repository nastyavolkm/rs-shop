import { ISubCategory } from "./subcategory.model";


export interface ICategoriesState {
    categories: ICategory[];
}
export interface ICategory {
    id: string,
    name: string,
    subCategories: ISubCategory[]
}

export interface ISelectedCategory extends ICategory {
    isActive: boolean;
}
