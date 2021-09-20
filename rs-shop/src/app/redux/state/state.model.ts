import { ICategoriesState } from './category.model';
import { IGoodsState } from './goods.model';
import { IUserState } from './user.model';

export interface IState {
  categories: ICategoriesState;
  goods: IGoodsState;
  user: IUserState;
}
