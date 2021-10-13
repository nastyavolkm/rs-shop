import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  user$!: Observable<IUser>;

  goods$!: Observable<IGood[]>;

  constructor(
    public location: Location,
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(UserSelectors.user));
    this.goods$ = this.orderService.getListGoods(this.user$, 'favorites');
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
