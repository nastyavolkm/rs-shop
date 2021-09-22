import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { IGood } from 'src/app/redux/state/good.model';
import { GoodsService } from '../services/goods.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-detailed-good',
  templateUrl: './detailed-good.component.html',
  styleUrls: ['./detailed-good.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedGoodComponent implements OnInit, OnDestroy {
  good$!: Observable<IGood | undefined>;

  subscribe!: any;

  id!: string;

  selectedImage!: string;

  selectedImageIndex!: number;

  isGoodFavorite!: boolean;

  addedToCart = false;

  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  isFavorite$!: Observable<boolean>;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    public goodsService: GoodsService,
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getGood();
    this.user$ = this.authService.checkLogin();
    this.isFavorite$ = this.orderService.isFavorite(this.user$, this.id);
    this.isFavorite$.subscribe((boolean) => (this.isGoodFavorite = boolean));
  }

  getGood(): void {
    this.subscribe = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.good$ = this.httpService.getGoodById(this.id);
    });
  }

  onSelect(image: string, i: number): void {
    this.selectedImage = image;
    this.selectedImageIndex = i;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onLikeClick(): void {
    if (this.isGoodFavorite) {
      this.isGoodFavorite = false;
      this.orderService.deleteFromFavorite(this.id);
    } else {
      this.isGoodFavorite = true;
      this.orderService.addToFavorite(this.id);
    }
  }
}
