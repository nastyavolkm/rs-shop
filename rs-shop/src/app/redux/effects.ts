import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../core/services/http.service';
import { SearchActions } from './actions';

@Injectable()
export class Effects {
    getCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchActions.getCategories),
            switchMap((data) =>
                this.httpService.getCategories(),
            ),
            switchMap((categories) => of(SearchActions.getCategoriesSuccessful({ categories }))),
        ),
    );

    constructor(private actions$: Actions, private httpService: HttpService) {}
}