import { IDetail } from './IDetail.model';
import { IOrderItem } from './IOrderItem.model';

export interface IOrder {
  items: IOrderItem[];
  details: IDetail;
  id: string;
}
