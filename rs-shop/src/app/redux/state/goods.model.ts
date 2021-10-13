import { IGood } from './good.model';

export interface IGoodsState {
  goodsSearch: IGood[];
  goodsCatalog: IGood[];
  goodById: IGood;
}
