import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { GoodsActions } from 'src/app/redux/actions/goodsActions';
import { GoodsSelectors } from 'src/app/redux/selectors/goodsSelectors';
import { ISubCategory } from 'src/app/redux/state/subcategory.model';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  subCategory$!: Observable<ISubCategory | undefined>;

  goods$ = this.store.pipe(select(GoodsSelectors.goods));

  id = '';

  subscribe!: any;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getSubCategory();
  }

  getSubCategory(): void {
    this.subscribe = this.route.params.subscribe(params => {
    this.id = params['id'];
    this.subCategory$ = this.httpService.getSubCategoryById(this.id);
    this.store.dispatch(GoodsActions.getGoodsBySubCategoryId({id: this.id}));
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
