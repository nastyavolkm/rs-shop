import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  goods$!: Observable<IGood[]>;

  constructor(
    public location: Location,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.checkLogin();
    this.goods$ = this.orderService.getFavoriteGoods(this.user$);
  }
}
