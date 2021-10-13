import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriesSelectors } from 'src/app/redux/selectors/categoriesSelectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { IGood } from 'src/app/redux/state/good.model';
import { goodsForSlider, popularGoods } from '../mock.goods';

@Injectable()
export class GoodsService {
  option$$ = new BehaviorSubject('');

  directionAsc$$ = new BehaviorSubject(false);

  constructor(private store: Store) {}

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

  getCategoryBySubCategory(id: string): Observable<ICategory | undefined> {
    return this.store.pipe(select(CategoriesSelectors.categories)).pipe(
      switchMap((categories) => {
        return of(
          categories.find((category) =>
            category.subCategories.find((subCategory) => subCategory.id === id),
          ),
        );
      }),
    );
  }
}
