import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriesActions } from 'src/app/redux/actions/categoriesActions';
import { CategoriesSelectors } from 'src/app/redux/selectors/selectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isCatalogShown$$ = new BehaviorSubject(false);

  isLoginFormShown$$ = new BehaviorSubject(false);

  categories$: Observable<ICategory[]> = this.store.pipe(select(CategoriesSelectors.categories));

  constructor(private coreDataService: CoreDataService, private store: Store) {}

  ngOnInit(): void {
    this.isCatalogShown$$ = this.coreDataService.isCatalogShown$$;
    this.store.dispatch(CategoriesActions.getCategories());
    this.isLoginFormShown$$ = this.coreDataService.isLoginFormShown$$;
  }
}
