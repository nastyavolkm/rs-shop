import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { OrderService } from 'src/app/core/services/order.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-favorite-good',
  templateUrl: './favorite-good.component.html',
  styleUrls: ['./favorite-good.component.scss'],
})
export class FavoriteGoodComponent implements OnInit, OnDestroy {
  @Input() user$!: Observable<IUser | IUnLoggedUser | undefined>;

  @Input() good!: IGood;

  @Input() goods$!: Observable<IGood[]>;

  @Output() id = new EventEmitter<string>();

  isGoodFavorite = true;

  addedToCart!: boolean;

  addedToCart$!: Observable<boolean>;

  subscribe: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.addedToCart$ = this.orderService.addedToCart(this.user$, this.good.id);
    this.subscribe = this.addedToCart$.subscribe((boolean) => (this.addedToCart = boolean));
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onCartClick(): void {
    if (this.addedToCart) {
      this.addedToCart = false;
      this.orderService.deleteFromCart(this.good.id);
    } else {
      this.addedToCart = true;
      this.orderService.addToCart(this.good.id);
    }
  }
}
