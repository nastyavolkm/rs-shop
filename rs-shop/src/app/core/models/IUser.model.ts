import { IOrder } from 'src/app/cart/cart/models/IOrder.model';

export interface IUser {
  firstName: string;
  lastName: string;
  cart: string[];
  favorites: string[];
  orders: IOrder[];
}
