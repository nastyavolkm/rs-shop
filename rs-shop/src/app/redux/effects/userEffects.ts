import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserActions } from '../actions/userActions';

@Injectable()
export class UserEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      switchMap((data) => this.authService.getUserInfo(data.token)),
      switchMap((user) => of(UserActions.getUserSuccessful({ user }))),
    ),
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
