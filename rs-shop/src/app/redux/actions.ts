import { createAction, props } from '@ngrx/store';
import { ICategory } from './state/category.model';

export namespace SearchActions {
    export const getCategories = createAction(
        'GET_CATEGORIES',
    );

    export const getCategoriesSuccessful = createAction(
        'GET_CATEGORIES_SUCCESSFUL',
        props<{ categories: ICategory[] }>(),
    );
}