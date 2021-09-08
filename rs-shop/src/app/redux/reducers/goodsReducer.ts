import { Action, createReducer, on } from '@ngrx/store';
import { GoodsActions } from '../actions/goodsActions';
import { IGoodsState } from '../state/goods.model';


const initialGoodsState: IGoodsState = {
    goods: []
}
const GoodsReducer = createReducer(
    initialGoodsState,
    on(GoodsActions.getGoodsSuccessful, (state, { goods }) => ({
        ...state,
        goods,
    })),
);

export function goodsReducer(
    state: IGoodsState | undefined,
    action: Action,
): IGoodsState {
    return GoodsReducer(state, action);
}
