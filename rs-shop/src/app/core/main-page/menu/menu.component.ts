import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriesActions } from 'src/app/redux/actions/categoriesActions';
import { CategoriesSelectors } from 'src/app/redux/selectors/selectors';
import { ICategory, ISelectedCategory } from 'src/app/redux/state/category.model';
import { CoreDataService } from '../../services/core-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories$!: Observable<ICategory[]>;

  selectedCategory!: ISelectedCategory;

  constructor(
    private store: Store,
    private coreDataService: CoreDataService
    ) { }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.categories$ = this.store.pipe(
      select(CategoriesSelectors.categories)
    );
  }

  onSelect(category: ICategory): void {
    this.selectedCategory = { ...category, "isActive": true };
  }
}
