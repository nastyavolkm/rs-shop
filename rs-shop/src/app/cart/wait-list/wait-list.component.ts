import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/goods/services/order.service';
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
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.orderService.getLoggedUser();
    this.orders$ = this.orderService.getOrders(this.user$);
    this.orders$.subscribe((orders) => console.log(orders));
  }

  // deleteGood(id: string): void {
  //   this.orders$ = this.orders$.pipe(
  //     switchMap((orders) => {
  //       const item = orders.items.find((good) => good.items.id === id);
  //       goods.splice(goods.indexOf(item!), 1);
  //       console.log(goods);
  //       return of(goods);
  //     }),
  //   );
  // }
}
