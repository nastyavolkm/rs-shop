import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ICategory } from 'src/app/redux/state/category.model';
import { IGood } from 'src/app/redux/state/good.model';
import { ISubCategory } from 'src/app/redux/state/subcategory.model';
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

  subscribe1!: any;

  id!: string;

  selectedImage!: string;

  selectedImageIndex!: number;

  isGoodFavorite!: boolean;

  addedToCart!: boolean;

  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  isFavorite$!: Observable<boolean>;

  addedToCart$!: Observable<boolean>;

  category$!: Observable<ICategory | undefined>;

  subCategory$!: Observable<ISubCategory | undefined>;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    public goodsService: GoodsService,
    private orderService: OrderService,
    private authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.getGood();
    this.getCategory();
    this.getSubCategory();
    this.user$ = this.authService.checkLogin();
    this.isFavorite$ = this.orderService.isFavorite(this.user$, this.id);
    this.addedToCart$ = this.orderService.addedToCart(this.user$, this.id);
    this.subscribe = this.isFavorite$.subscribe((boolean) => (this.isGoodFavorite = boolean));
    this.subscribe1 = this.addedToCart$.subscribe((boolean) => (this.addedToCart = boolean));
  }

  getGood(): void {
    this.subscribe = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.good$ = this.httpService.getGoodById(this.id);
    });
  }

  getCategory(): Observable<ICategory | undefined> {
    this.category$ = this.good$.pipe(
      switchMap((good) => {
        return this.httpService.getCategoryById(good!.category);
      }),
    );
    return this.category$;
  }

  getSubCategory(): Observable<ISubCategory | undefined> {
    this.subCategory$ = this.good$.pipe(
      switchMap((good) => {
        return this.httpService.getSubCategoryById(good!.subCategory);
      }),
    );
    return this.subCategory$;
  }

  onSelect(image: string, i: number): void {
    this.selectedImage = image;
    this.selectedImageIndex = i;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    this.subscribe1.unsubscribe();
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
