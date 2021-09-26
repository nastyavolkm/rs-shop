import { Action, createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/userActions';
import { IUserState } from '../state/user.model';

const initialUserState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    cart: [],
    favorites: [],
    orders: [],
  },
};

const UserReducer = createReducer(
  initialUserState,
  on(UserActions.getUserSuccessful, (state, { user }) => ({
    ...state,
    user,
  })),
  on(UserActions.getUnLoggedUser, (state) => ({
    ...state,
    user: initialUserState.user,
  })),
);

export function userReducer(state: IUserState | undefined, action: Action): IUserState {
  return UserReducer(state, action);
}
