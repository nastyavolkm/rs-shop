import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
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
    this.goods$ = this.httpService.getGoodsBySubCategoryId(this.id);
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
