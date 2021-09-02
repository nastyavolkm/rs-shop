import { Action, createReducer, on } from '@ngrx/store';
import { SearchActions } from './actions';
import { IState } from './state/state.model';


const initialState: IState = {
    categories: []
}
const SearchReducer = createReducer(
    initialState,
    on(SearchActions.getCategoriesSuccessful, (state, { categories}) => ({
        ...state,
        categories,
    })),
);

export function searchReducer(
    state: IState | undefined,
    action: Action,
): IState {
    return SearchReducer(state, action);
}