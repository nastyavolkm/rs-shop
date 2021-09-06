import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IGoodsState } from '../state/goods.model';

export namespace GoodsSelectors {
    export const state = createFeatureSelector<IGoodsState>('goods');
    export const goods = createSelector(
        state,
        (search) => search.goods,
    );
}
