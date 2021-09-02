import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriesActions } from 'src/app/redux/actions';
import { CategorySelectors } from 'src/app/redux/selectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  categories$!: Observable<ICategory[]>;

  isCatalogShown$$ = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private coreDataService: CoreDataService
    ) { }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.categories$ = this.store.pipe(
      select(CategorySelectors.categories)
    );
    this.isCatalogShown$$ = this.coreDataService.isCatalogShown$$;
  }

}
