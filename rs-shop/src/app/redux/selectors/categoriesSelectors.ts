import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICategoriesState } from '../state/category.model';

export namespace CategoriesSelectors {
  export const state = createFeatureSelector<ICategoriesState>('categories');
  export const categories = createSelector(state, (search) => search.categories);
  export const categoryById = (id: string) =>
    createSelector(
      state,
      (search: ICategoriesState) =>
        search.categories.find((category) => id === category.id) || null,
    );
}
