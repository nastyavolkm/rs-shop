import { Action, createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/userActions';
import { IUserState } from '../state/user.model';

const initialUserState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    cart: [],
    favorites: [],
    orders: [
      {
        items: [
          {
            id: '',
            amount: 0,
          },
        ],
        details: {
          name: '',
          address: '',
          phone: '',
          timeToDeliver: '',
          comment: '',
        },
        id: '',
      },
    ],
  },
};
const UserReducer = createReducer(
  initialUserState,
  on(UserActions.getUserSuccessful, (state, { user }) => ({
    ...state,
    user,
  })),
);

export function userReducer(state: IUserState | undefined, action: Action): IUserState {
  return UserReducer(state, action);
}
