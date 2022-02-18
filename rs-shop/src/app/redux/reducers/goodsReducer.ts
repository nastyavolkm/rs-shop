import { Action, createReducer, on } from '@ngrx/store';
import { GoodsActions } from '../actions/goodsActions';
import { initialGoodState } from '../state/good.model';
import { IGoodsState } from '../state/goods.model';

const initialGoodsState: IGoodsState = {
  goodsSearch: [],
  goodsCatalog: [],
  goodById: initialGoodState,
};
const GoodsReducer = createReducer(
  initialGoodsState,
  on(GoodsActions.getGoodsSearchSuccessful, (state, { goodsSearch }) => ({
    ...state,
    goodsSearch: goodsSearch,
  })),
  on(GoodsActions.getGoodsCatalogSuccessful, (state, { goodsCatalog }) => ({
    ...state,
    goodsCatalog: goodsCatalog,
  })),
  on(GoodsActions.getGoodByIdSuccessful, (state, { good }) => ({
    ...state,
    goodById: good,
  })),
);

export function goodsReducer(state: IGoodsState | undefined, action: Action): IGoodsState {
  return GoodsReducer(state, action);
}
