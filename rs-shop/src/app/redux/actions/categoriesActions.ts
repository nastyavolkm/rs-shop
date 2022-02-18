import { createAction, props } from '@ngrx/store';
import { ICategory } from '../state/category.model';

export namespace CategoriesActions {
  export const getCategories = createAction('GET_CATEGORIES');

  export const getCategoriesSuccessful = createAction(
    'GET_CATEGORIES_SUCCESSFUL',
    props<{ categories: ICategory[] }>(),
  );

  export const getCategoryById = createAction('GET_CATEGORY_BY_ID', props<{ id: string }>());

  export const getCategoryByIdSuccessful = createAction(
    'GET_CATEGORY_BY_ID_SUCCESSFUL',
    props<{ category: ICategory | undefined }>(),
  );

  export const getCategoriesByWord = createAction(
    'GET_CATEGORIES_BY_WORD',
    props<{ value: string }>(),
  );
}
