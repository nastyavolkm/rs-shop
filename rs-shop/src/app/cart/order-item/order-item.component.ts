import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { OrderService } from 'src/app/goods/services/order.service';
import { IGood } from 'src/app/redux/state/good.model';
import { IOrder } from '../cart/models/IOrder.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() user$!: Observable<IUser>;

  @Input() order!: IOrder;

  @Input() orders$!: Observable<IOrder[]>;

  goods$!: Observable<IGood[]>;

  @Output() id = new EventEmitter<string>();

  commonPrice$!: Observable<number>;

  subscribe: any;

  isOrderShown = false;

  isEditMode = false;

  isFormDeliveryShown = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.goods$ = this.orderService.getGoodsFromOrder(this.order);
    this.commonPrice$ = this.orderService.getOrderPrice(this.goods$);
  }
}
