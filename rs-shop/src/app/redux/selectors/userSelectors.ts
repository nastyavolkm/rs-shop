import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.model';

export namespace UserSelectors {
  export const state = createFeatureSelector<IUserState>('user');
  export const user = createSelector(state, (search) => search.user);
}
