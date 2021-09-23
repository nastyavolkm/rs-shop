import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreDataService } from 'src/app/core/services/core-data.service';
import { GoodsSelectors } from 'src/app/redux/selectors/goodsSelectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss'],
})
export class SearchResultsBlockComponent implements OnInit {
  @Output() valueToSearch = new EventEmitter();

  goods$!: Observable<IGood[]>;

  categories$!: Observable<ICategory[]>;

  constructor(
    private store: Store,
    private coreDataService: CoreDataService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.coreDataService.categoriesByWord$;
    this.goods$ = this.store.pipe(select(GoodsSelectors.goods));
  }
}
