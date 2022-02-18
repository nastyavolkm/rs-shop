import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { UserActions } from '../actions/userActions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      switchMap(() => this.authService.getCurrentUser()),
      switchMap((user) => of(UserActions.getUserSuccessful({ user }))),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap((data) => {
        this.orderService.addToList(data.id, data.list);
        return this.authService
          .getCurrentUser()
          .pipe(switchMap((user) => of(UserActions.getUserSuccessful({ user }))));
      }),
    ),
  );
}
