import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
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
  ) {}

  ngOnInit(): void {
    this.getSubCategory();
    this.getCategory(this.id);
  }

  getSubCategory(): void {
    this.subscribe = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.subCategory$ = this.httpService.getSubCategoryById(this.id);
      this.goods$ = this.httpService.getGoodsBySubCategoryId(this.id);
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
