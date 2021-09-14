import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CategoriesSelectors } from 'src/app/redux/selectors/selectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { IGood } from 'src/app/redux/state/good.model';
import { ISubCategory } from 'src/app/redux/state/subcategory.model';

const CATEGORIES = 'categories';
const GOODS = 'goods';
const USERS = 'users';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  goods$!: Observable<IGood[]>;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    ) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(CATEGORIES);
  }

  getSearchResults(value: string): Observable<IGood[]> {
    const valueToSearch$: Observable<string> = of(value);
    return valueToSearch$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((word: string) => {
         return this.http.get<IGood[]>(`${GOODS}/search?text=${word}`);
        })
      )
  }

  getCategoryById(id: string): Observable<ICategory | undefined> {
    return this.store.pipe(
      select(CategoriesSelectors.categories)
    ).pipe(
      switchMap((categories)=> of(categories.find((category) => category.id === id)))
    );
  }

  getSubCategoryById(id: string): Observable<ISubCategory> {
    let subCategory: ISubCategory;
    const sub = this.store.pipe(
      select(CategoriesSelectors.categories)
    ).pipe(
      switchMap((categories) => {
        categories.forEach((category) => {
          category.subCategories.forEach((subcategory) => {
            if (subcategory.id === id) {
              subCategory = subcategory
            }
          })})
          return of(subCategory);
        })
    );
    return sub;
  }

  getGoodsBySubCategoryId(id: string): Observable<IGood[]> {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    const categoryId = s[1].path;
    this.goods$ = this.http.get<IGood[]>(`${GOODS}/category/${categoryId}/${id}`);
    return this.goods$;
  }

  getGoodById(id: string): Observable<IGood> {
    return this.http.get<IGood>(`${GOODS}/item/${id}`);
  }

  getGoodsByCategory(id: string): Observable<IGood[]> {
    return this.http.get<IGood[]>(`${GOODS}/category/${id}`).pipe(
      switchMap((goods) => of(goods.slice(0, 10)))
    );
  }
}
