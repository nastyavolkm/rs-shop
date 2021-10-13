import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../core/services/http.service';
import { CategoriesActions } from '../actions/categoriesActions';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private httpService: HttpService) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      switchMap(() => this.httpService.getCategories()),
      switchMap((categories) => of(CategoriesActions.getCategoriesSuccessful({ categories }))),
    ),
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getCategoryById),
      switchMap((data) => this.httpService.getCategoryById(data.id)),
      switchMap((category) => of(CategoriesActions.getCategoryByIdSuccessful({ category }))),
    ),
  );
}
