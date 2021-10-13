import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { OrderService } from 'src/app/core/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-favorite-good',
  templateUrl: './favorite-good.component.html',
  styleUrls: ['./favorite-good.component.scss'],
})
export class FavoriteGoodComponent implements OnInit, OnDestroy {
  @Input() user$!: Observable<IUser>;

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
    private store: Store,
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
      this.orderService.deleteFromList(this.good.id, 'cart');
    } else {
      this.addedToCart = true;
      this.store.dispatch(UserActions.updateUser({ id: this.good.id, list: 'cart' }));
    }
  }
}
