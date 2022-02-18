import { createAction, props } from '@ngrx/store';
import { IGood } from '../state/good.model';

export namespace GoodsActions {
  export const getGoodsSearch = createAction('GET_GOODS_SEARCH', props<{ value: string }>());

  export const getGoodsSearchSuccessful = createAction(
    'GET_GOODS_SEARCH_SUCCESSFUL',
    props<{ goodsSearch: IGood[] }>(),
  );

  export const getGoodsCatalog = createAction('GET__GOODS_CATALOG', props<{ id: string }>());

  export const getGoodsCatalogSuccessful = createAction(
    'GET_GOODS_CATALOG_SUCCESSFUL',
    props<{ goodsCatalog: IGood[] }>(),
  );

  export const getGoodById = createAction('GET_GOOD_BY_ID', props<{ id: string }>());

  export const getGoodByIdSuccessful = createAction(
    'GET_GOOD_BY_ID_SUCCESSFUL',
    props<{ good: IGood }>(),
  );
}
