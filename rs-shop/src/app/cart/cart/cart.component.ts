import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/core/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';
import { IUser } from '../../core/models/IUser.model';
import { AuthService } from '../../core/services/auth.service';
import { CoreDataService } from '../../core/services/core-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser>;

  goods$!: Observable<IGood[]>;

  pricesArray$!: Observable<number[]>;

  commonPrice$!: Observable<number>;

  isOrderShown = false;

  isOrderSubmitted$$ = new BehaviorSubject(false);

  constructor(
    private coreDataservice: CoreDataService,
    private authService: AuthService,
    public location: Location,
    private orderService: OrderService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.coreDataservice.isCartButtonActive$$.next(true);
    this.user$ = this.store.pipe(select(UserSelectors.user));
    this.goods$ = this.orderService.getListGoods(this.user$, 'cart');
    this.isOrderSubmitted$$ = this.orderService.isOrderSubmitted$$;
    this.getPricesArray();
    this.getCommonPrice();
  }

  ngOnDestroy(): void {
    this.coreDataservice.isCartButtonActive$$.next(false);
  }

  getPricesArray(): void {
    this.pricesArray$ = this.goods$.pipe(
      switchMap((goods) => {
        const pricesArray = goods.map((good) => good.price);
        return of(pricesArray);
      }),
    );
  }

  getCommonPrice(): void {
    this.commonPrice$ = this.pricesArray$.pipe(
      switchMap((prices) => {
        return of(prices.reduce((a, b) => a + b));
      }),
    );
  }

  changeCommonPrice(price: number): void {
    console.log(price);
    this.pricesArray$ = this.pricesArray$.pipe(
      switchMap((pricesArray) => {
        pricesArray.push(price);
        return of(pricesArray);
      }),
    );
    this.getCommonPrice();
  }

  afterOrderSubmit(): void {
    this.store.dispatch(UserActions.getUser());
  }

  deleteGood(id: string): void {
    const token = this.authService.getCurrentToken();
    if (token === undefined) {
      this.goods$ = this.goods$.pipe(
        switchMap((goods) => {
          const item = goods.find((good) => good.id === id);
          goods.splice(goods.indexOf(item!), 1);
          return of(goods);
        }),
      );
      this.store.dispatch(UserActions.getUser());
    }
  }
}
