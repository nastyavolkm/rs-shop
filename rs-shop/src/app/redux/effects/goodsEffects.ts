import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../core/services/http.service';
import { GoodsActions } from '../actions/goodsActions';

@Injectable()
export class GoodsEffects {
    getGoods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GoodsActions.getGoods),
            switchMap((data) =>
                this.httpService.getSearchResults(data.value),
            ),
            switchMap((goods) =>
            of(GoodsActions.getGoodsSuccessful({ goods }))),
        ),
    );

    getGoodsBySubCategoryId$ = createEffect(() =>
            this.actions$.pipe(
                ofType(GoodsActions.getGoodsBySubCategoryId),
                switchMap((data) =>
                this.httpService.getGoodsBySubCategoryId(data.id)
                ),
                switchMap((goods) =>
                of(GoodsActions.getGoodsSuccessful({goods}))),
            ),
    );

    constructor(private actions$: Actions, private httpService: HttpService) {}
}
