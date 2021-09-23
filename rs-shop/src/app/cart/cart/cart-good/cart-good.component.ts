import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { CoreDataService } from 'src/app/core/services/core-data.service';
import { OrderService } from 'src/app/goods/services/order.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-cart-good',
  templateUrl: './cart-good.component.html',
  styleUrls: ['./cart-good.component.scss'],
})
export class CartGoodComponent implements OnInit, OnDestroy {
  @Input() user$!: Observable<IUser | IUnLoggedUser | undefined>;

  @Input() good!: IGood;

  @Input() goods$!: Observable<IGood[]>;

  @Output() id = new EventEmitter<string>();

  isGoodFavorite!: boolean;

  isFavorite$!: Observable<boolean>;

  addedToCart = true;

  subscribe!: any;

  amount = 1;

  commonPrice$!: Observable<number>;

  @Output() newAmount = new EventEmitter<number>();

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService,
    public coreDataService: CoreDataService,
  ) {}

  ngOnInit(): void {
    this.isFavorite$ = this.orderService.isFavorite(this.user$, this.good.id);
    this.subscribe = this.isFavorite$.subscribe((boolean) => (this.isGoodFavorite = boolean));
    this.getCommonPrice(this.good.price, this.amount);
  }

  onLikeClick(isGoodFavorite: boolean): void {
    this.isGoodFavorite = this.orderService.onLikeClick(isGoodFavorite, this.good.id);
  }

  onDecrementClick(price: number): void {
    if (this.amount > 0) {
      this.amount -= 1;
      this.getCommonPrice(this.good.price, this.amount);
      this.newAmount.emit(price * -1);
    }
  }

  onIncrementClick(price: number): void {
    if (this.amount < this.good.availableAmount) {
      this.amount += 1;
      this.getCommonPrice(this.good.price, this.amount);
      this.newAmount.emit(price);
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  getCommonPrice(price: number, amount: number): Observable<number> {
    this.commonPrice$ = this.orderService.getCommonPrice(price, amount);
    return this.commonPrice$;
  }

  changeCommonPrice(): void {
    if (this.amount < this.good.availableAmount) {
      this.getCommonPrice(this.good.price, this.amount);
    }
  }
}
