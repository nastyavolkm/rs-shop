import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '../actions/categoriesActions';
import { ICategoriesState } from '../state/category.model';


const initialCategoriesState: ICategoriesState = {
    categories: []
}
const CategoriesReducer = createReducer(
    initialCategoriesState,
    on(CategoriesActions.getCategoriesSuccessful, (state, { categories}) => ({
        ...state,
        categories,
    })),
);


export function categoriesReducer(
    state: ICategoriesState | undefined,
    action: Action,
): ICategoriesState {
    return CategoriesReducer(state, action);
}
