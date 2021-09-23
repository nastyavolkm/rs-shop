import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { IGood } from 'src/app/redux/state/good.model';
import { GoodsService } from '../services/goods.service';
import { OrderService } from '../services/order.service';

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

  user$!: Observable<IUser | IUnLoggedUser | undefined>;

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
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.checkLogin();
    this.isFavorite$ = this.orderService.isFavorite(this.user$, this.good.id);
    this.addedToCart$ = this.orderService.addedToCart(this.user$, this.good.id);
    this.subscribe = this.addedToCart$.subscribe((boolean) => (this.addedToCart[this.i] = boolean));
  }

  onLikeClick(): void {
    if (this.isGoodFavorite[this.i]) {
      this.isGoodFavorite[this.i] = false;
      this.orderService.deleteFromFavorite(this.good.id);
    } else {
      this.isGoodFavorite[this.i] = true;
      this.orderService.addToFavorite(this.good.id);
    }
  }

  onCartClick(): void {
    if (this.addedToCart[this.i]) {
      this.addedToCart[this.i] = false;
      this.orderService.deleteFromCart(this.good.id);
    } else {
      this.addedToCart[this.i] = true;
      this.orderService.addToCart(this.good.id);
    }
  }
}
