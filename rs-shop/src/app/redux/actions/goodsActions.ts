import { createAction, props } from '@ngrx/store';
import { IGood } from '../state/good.model';

export namespace GoodsActions {
  export const getGoods = createAction('GET_GOODS', props<{ value: string }>());

  export const getGoodsSuccessful = createAction(
    'GET_GOODS_SUCCESSFUL',
    props<{ goods: IGood[] }>(),
  );

  export const getGoodsBySubCategoryId = createAction(
    'GET__GOODS_BY_SUBCATEGORY_ID',
    props<{ id: string }>(),
  );

  export const getGoodById = createAction('GET_GOOD_BY_ID', props<{ id: string }>());
}
