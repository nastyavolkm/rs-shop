import { createAction, props } from '@ngrx/store';
import { IToken } from 'src/app/core/models/IToken.model';
import { IUser } from 'src/app/core/models/IUser.model';

export namespace UserActions {
  export const getUser = createAction('GET_USER', props<{ token: IToken }>());

  export const getUserSuccessful = createAction('GET_USER_SUCCESSFUL', props<{ user: IUser }>());
  export const getUnLoggedUser = createAction('GET_UNLOGGED_USER');
}
