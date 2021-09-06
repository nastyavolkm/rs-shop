import { createAction, props } from '@ngrx/store';
import { ICategory } from '../state/category.model';

export namespace CategoriesActions {
    export const getCategories = createAction(
        'GET_CATEGORIES',
    );

    export const getCategoriesSuccessful = createAction(
        'GET_CATEGORIES_SUCCESSFUL',
        props<{ categories: ICategory[] }>(),
    );

    export const getCategoriesByWord = createAction(
        'GET_CATEGORIES_BY_WORD',
        props<{ value: string }>(),
    );
}
