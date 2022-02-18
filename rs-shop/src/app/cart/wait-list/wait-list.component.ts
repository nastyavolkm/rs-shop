import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { OrderService } from 'src/app/core/services/order.service';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IOrder } from '../cart/models/IOrder.model';

@Component({
  selector: 'app-wait-list',
  templateUrl: './wait-list.component.html',
  styleUrls: ['./wait-list.component.scss'],
})
export class WaitListComponent implements OnInit {
  user$!: Observable<IUser>;

  orders$!: Observable<IOrder[]>;

  constructor(
    public location: Location,
    private orderService: OrderService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(UserSelectors.user));
    this.orders$ = this.orderService.getOrders(this.user$);
  }
}
