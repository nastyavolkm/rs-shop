import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { GoodsActions } from 'src/app/redux/actions/goodsActions';
import { GoodsSelectors } from 'src/app/redux/selectors/goodsSelectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { IGood } from 'src/app/redux/state/good.model';
import { ISubCategory } from 'src/app/redux/state/subcategory.model';
import { GoodsService } from '../services/goods.service';

const GOODS_LIMIT = 10;

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  subCategory$!: Observable<ISubCategory | undefined>;

  goods$!: Observable<IGood[]>;

  newGoods$!: Observable<IGood[]>;

  id = '';

  subscribe!: any;

  isPopularSortActive = false;

  isPriceSortActive = false;

  option$$ = this.goodsService.option$$;

  directionAsc$$ = this.goodsService.directionAsc$$;

  start = 0;

  goodsPerPage = GOODS_LIMIT;

  category$!: Observable<ICategory | undefined>;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    public goodsService: GoodsService,
    public router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getSubCategory();
    this.getCategory(this.id);
  }

  getSubCategory(): void {
    this.subscribe = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.subCategory$ = this.httpService.getSubCategoryById(this.id);
      this.store.dispatch(GoodsActions.getGoodsCatalog({ id: this.id }));
      this.goods$ = this.store.pipe(select(GoodsSelectors.goodsCatalog));
    });
  }

  getCategory(id: string): void {
    this.category$ = this.goodsService.getCategoryBySubCategory(id);
  }

  showMoreGoods(): void {
    this.goodsPerPage = this.goodsPerPage + GOODS_LIMIT;
  }

  showLessGoods(): void {
    this.goodsPerPage = this.goodsPerPage - GOODS_LIMIT;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
