import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/goods/services/order.service';
import { IGood } from 'src/app/redux/state/good.model';
import { IUnLoggedUser } from '../../core/models/IUnLoggedUser.model';
import { IUser } from '../../core/models/IUser.model';
import { AuthService } from '../../core/services/auth.service';
import { CoreDataService } from '../../core/services/core-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  goods$!: Observable<IGood[]>;

  commonPrice!: number;

  constructor(
    private coreDataservice: CoreDataService,
    private authService: AuthService,
    public location: Location,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.coreDataservice.isCartButtonActive$$.next(true);
    this.user$ = this.authService.checkLogin();
    this.goods$ = this.orderService.getCartGoods(this.user$);
  }

  ngOnDestroy(): void {
    this.coreDataservice.isCartButtonActive$$.next(false);
  }

  deleteGood(id: string): void {
    this.goods$ = this.goods$.pipe(
      switchMap((goods) => {
        const item = goods.find((good) => good.id === id);
        goods.splice(goods.indexOf(item!), 1);
        console.log(goods);
        return of(goods);
      }),
    );
  }

  getCommonPrice(amount: Observable<number>): void {
    console.log(amount);
  }
}
