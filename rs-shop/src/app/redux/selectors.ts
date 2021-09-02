import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './state/state.model';

export namespace CategorySelectors {
    export const state = createFeatureSelector<IState>('categories');
    export const categories = createSelector(
        state,
        (search) => search.categories,
    );
}