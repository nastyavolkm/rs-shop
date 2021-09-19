import { ICategoriesState } from './category.model';
import { IGoodsState } from './goods.model';

export interface IState {
  categories: ICategoriesState;
  goods: IGoodsState;
}
