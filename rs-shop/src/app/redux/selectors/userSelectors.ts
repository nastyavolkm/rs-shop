import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.model';

export namespace UserSelectors {
  export const userState = createFeatureSelector<IUserState>('user');
  export const user = createSelector(userState, (state) => state.user);
}
