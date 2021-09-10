import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriesSelectors } from 'src/app/redux/selectors/selectors';
import { ICategory } from 'src/app/redux/state/category.model';
import { coreData } from '../mock.header';

@Injectable()
export class CoreDataService {

  isCatalogShown = false;

  isCatalogShown$$ = new BehaviorSubject(this.isCatalogShown);

  isCatalogButtonActive = false;

  isCatalogButtonActive$$ = new BehaviorSubject(this.isCatalogButtonActive);

  isLogInButtonActive = false;

  isLogInButtonActive$$ = new BehaviorSubject(this.isLogInButtonActive);

  isLoginFormShown$$ = new BehaviorSubject(false);

  categoriesByWord$!: Observable<ICategory[]>;

  constructor(private store: Store) {}

  getOpenTime(): string {
    return coreData.openHours.openTime;
  }
  getCloseTime(): string {
    return coreData.openHours.closeTime;
  }

  getCitiesList(): string[] {
    return coreData.cities;
  }

  getViberNumber(): string {
    return coreData.contacts.viber;
  }

  getTelegramNumber(): string {
    return coreData.contacts.telegram;
  }

  getStaticNumber(): string {
    return coreData.contacts.static;
  }

  getLifeNumber(): string {
    return coreData.contacts.life;
  }

  getA1Number(): string {
    return coreData.contacts.a1;
  }

  getContacts(): [string, string][] {
    return Object.entries(coreData.contacts);
  }

  toggleCatalog(): void {
    this.isCatalogShown = !this.isCatalogShown;
    this.isCatalogShown$$.next(this.isCatalogShown);
    this.isCatalogButtonActive = !this.isCatalogButtonActive;
    this.isCatalogButtonActive$$.next(this.isCatalogButtonActive);
  }

  toggleLogInBlock(): void {
    this.isLogInButtonActive = !this.isLogInButtonActive;
    this.isLogInButtonActive$$.next(this.isLogInButtonActive);
  }

  getCategoriesByWord(value: string): void {
    this.categoriesByWord$ = this.store.select(CategoriesSelectors.categories)
    .pipe(
      switchMap((categories) =>  {
       return of(categories.filter((category) => category.subCategories
      .find((subCategory) => subCategory.name.toLowerCase().includes(value.toLowerCase()))));
      })
    );
  }

  showLoginForm(): void {
    this.isLoginFormShown$$.next(true);
  }
}
