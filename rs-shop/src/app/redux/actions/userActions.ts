import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/core/models/IUser.model';

export namespace UserActions {
  export const getUser = createAction('GET_USER');

  export const getUserSuccessful = createAction('GET_USER_SUCCESSFUL', props<{ user: IUser }>());

  export const updateUser = createAction('UPDATE_USER', props<{ id: string; list: string }>());

  export const updateUserSuccessful = createAction(
    'CREATE_USER_SUCCESSFUL',
    props<{ user: IUser }>(),
  );
}
