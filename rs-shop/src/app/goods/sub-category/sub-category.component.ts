import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { IGood } from 'src/app/redux/state/good.model';
import { ISubCategory } from 'src/app/redux/state/subcategory.model';
import { GoodsService } from '../services/goods.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit, OnDestroy {

  subCategory$!: Observable<ISubCategory | undefined>;

  goods$!: Observable<IGood[]>;

  id = '';

  subscribe!: any;

  isPopularSortActive = false;

  isPriceSortActive = false;

  option$$ = this.goodsService.option$$;

  directionAsc$$ = this.goodsService.directionAsc$$;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    public goodsService: GoodsService,
  ) { }

  ngOnInit(): void {
    this.getSubCategory();
  }

  getSubCategory(): void {
    this.subscribe = this.route.params.subscribe(params => {
    this.id = params['id'];
    this.subCategory$ = this.httpService.getSubCategoryById(this.id);
    this.goods$ = this.httpService.getGoodsBySubCategoryId(this.id);
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
