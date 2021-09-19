import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICategoriesState } from '../state/category.model';

export namespace CategoriesSelectors {
  export const state = createFeatureSelector<ICategoriesState>('categories');
  export const categories = createSelector(state, (search) => search.categories);
}
