import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IGoodsState } from '../state/goods.model';

export namespace GoodsSelectors {
  export const goodState = createFeatureSelector<IGoodsState>('goods');
  export const goodsSearch = createSelector(goodState, (state) => state.goodsSearch);
  export const goodsCatalog = createSelector(goodState, (state) => state.goodsCatalog);
  export const goodById = createSelector(goodState, (state) => state.goodById);
}
