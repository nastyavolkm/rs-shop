import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
