import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGood } from 'src/app/redux/state/good.model';
import { goodsForSlider, popularGoods } from '../mock.goods';

@Injectable()
export class GoodsService {

  option$$ = new BehaviorSubject('');

  directionAsc$$ = new BehaviorSubject(true);

  constructor() { }

  toggleColor(event: Event): void {
    (event.target as HTMLElement).classList.add();
  }

  setOptionToSort(value: string): void {
    this.option$$.next(value);
    this.directionAsc$$.next(!this.directionAsc$$.getValue());
  }

  getCountOfRating(number: number): number[] {
    return Array(number);
  }

  getGoodsForSlider(): IGood[] {
    return goodsForSlider;
  }

  getPopularGoods(): IGood[] {
    return popularGoods;
  }
}
