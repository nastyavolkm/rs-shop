import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../core/services/http.service';
import { CategoriesActions } from '../actions/categoriesActions';

@Injectable()
export class CategoriesEffects {
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      switchMap(() => this.httpService.getCategories()),
      switchMap((categories) => of(CategoriesActions.getCategoriesSuccessful({ categories }))),
    ),
  );

  constructor(private actions$: Actions, private httpService: HttpService) {}
}
