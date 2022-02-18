import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { OrderService } from 'src/app/core/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';
import { GoodsService } from '../services/goods.service';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss'],
})
export class GoodComponent implements OnInit {
  @Input() good!: IGood;

  @Input() goods: IGood[] = [];

  @Input() selectedGoodIndex!: number;

  @Input() i!: number;

  user$!: Observable<IUser>;

  isGoodFavorite: boolean[] = Array(this.goods.length).fill(false);

  addedToCart: boolean[] = Array(this.goods.length).fill(false);

  isFavorite$!: Observable<boolean>;

  addedToCart$!: Observable<boolean>;

  subscribe: any;

  constructor(
    public goodsService: GoodsService,
    public orderService: OrderService,
    public router: Router,
    public route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(UserSelectors.user));
    this.isFavorite$ = this.orderService.isFavorite(this.user$, this.good.id);
    this.addedToCart$ = this.orderService.addedToCart(this.user$, this.good.id);
    this.subscribe = this.addedToCart$.subscribe((boolean) => (this.addedToCart[this.i] = boolean));
  }

  onLikeClick(): void {
    if (this.isGoodFavorite[this.i]) {
      this.isGoodFavorite[this.i] = false;
      this.orderService.deleteFromList(this.good.id, 'favorites');
    } else {
      this.isGoodFavorite[this.i] = true;
      this.store.dispatch(UserActions.updateUser({ id: this.good.id, list: 'favorites' }));
    }
  }

  onCartClick(): void {
    if (this.addedToCart[this.i]) {
      this.addedToCart[this.i] = false;
      this.orderService.deleteFromList(this.good.id, 'cart');
    } else {
      this.addedToCart[this.i] = true;
      this.store.dispatch(UserActions.updateUser({ id: this.good.id, list: 'cart' }));
    }
  }
}
