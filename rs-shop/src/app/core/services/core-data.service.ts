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
  }

  getCategoriesByWord(value: string): void {
    this.categoriesByWord$ = this.store.select(CategoriesSelectors.categories)
    .pipe(
      switchMap((categories) =>  {
        console.log(categories);
      return of(categories.filter((category) => category.subCategories
      .filter((subCategory) => subCategory.name.toLowerCase().includes(value.toLowerCase()))))
      })
    );
  }
}
