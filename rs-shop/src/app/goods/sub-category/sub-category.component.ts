import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { GoodsSelectors } from 'src/app/redux/selectors/goodsSelectors';
import { IGood } from 'src/app/redux/state/good.model';
import { ISubCategory } from 'src/app/redux/state/subcategory.model';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  subCategory$!: Observable<ISubCategory | undefined>;

  goods$!: Observable<IGood[]>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {

    this.getSubCategory();
    this.goods$ = this.store.pipe(
      select(GoodsSelectors.goods)
      );
  }

  getSubCategory(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.subCategory$ = this.httpService.getSubCategoryById(id);
  }

}
