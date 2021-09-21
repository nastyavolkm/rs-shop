import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { OrderService } from 'src/app/goods/services/order.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-favorite-good',
  templateUrl: './favorite-good.component.html',
  styleUrls: ['./favorite-good.component.scss'],
})
export class FavoriteGoodComponent {
  @Input() user$!: Observable<IUser | IUnLoggedUser | undefined>;

  @Input() good!: IGood;

  @Input() goods$!: Observable<IGood[]>;

  @Output() id = new EventEmitter<string>();

  isGoodFavorite = true;

  addedToCart = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService,
  ) {}
}
