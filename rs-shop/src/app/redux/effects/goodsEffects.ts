import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../core/services/http.service';
import { GoodsActions } from '../actions/goodsActions';

@Injectable()
export class GoodsEffects {
  getGoodsSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GoodsActions.getGoodsSearch),
      switchMap((data) => this.httpService.getSearchResults(data.value)),
      switchMap((goodsSearch) => of(GoodsActions.getGoodsSearchSuccessful({ goodsSearch }))),
    ),
  );

  getGoodsCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GoodsActions.getGoodsCatalog),
      switchMap((data) => this.httpService.getGoodsBySubCategoryId(data.id)),
      switchMap((goodsCatalog) => of(GoodsActions.getGoodsCatalogSuccessful({ goodsCatalog }))),
    ),
  );

  getGoodById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GoodsActions.getGoodById),
      switchMap((data) => this.httpService.getGoodById(data.id)),
      switchMap((good) => of(GoodsActions.getGoodByIdSuccessful({ good }))),
    ),
  );

  constructor(private actions$: Actions, private httpService: HttpService) {}
}
