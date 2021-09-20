import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriesSelectors } from '../../redux/selectors/categoriesSelectors';
import { ICategory } from '../../redux/state/category.model';
import { coreData } from '../mock.header';
import { ILocation, ILocationRus } from '../models/ILocation.model';

@Injectable()
export class CoreDataService {
  isCatalogShown = false;

  isCatalogShown$$ = new BehaviorSubject(this.isCatalogShown);

  isCatalogButtonActive = false;

  isCatalogButtonActive$$ = new BehaviorSubject(this.isCatalogButtonActive);

  isLogInButtonActive = false;

  isLogInButtonActive$$ = new BehaviorSubject(this.isLogInButtonActive);

  isCartButtonActive$$ = new BehaviorSubject(false);

  categoriesByWord$!: Observable<ICategory[]>;

  constructor(
    private store: Store,
    private customHttp: HttpClient,
    private backend: HttpBackend,
    private router: Router,
  ) {
    this.customHttp = new HttpClient(this.backend);
  }

  getLocation(): Observable<string> {
    const location$: Observable<ILocationRus> = this.customHttp
      .get<ILocation>('https://ipinfo.io/?token=5f698d693a183f')
      .pipe(
        switchMap((data) => {
          return this.customHttp.get<ILocationRus>(
            `https://api.opencagedata.com/geocode/v1/json?key=7046fc352eeb4dbcb07a82d70cb2571c&q=${data.loc}&language=ru`,
          );
        }),
      );
    return location$.pipe(
      switchMap((location) => {
        return of(location.results[0].components.city);
      }),
    );
  }

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

  showCartBlock(): void {
    this.isCartButtonActive$$.next(true);
    this.router.navigateByUrl('order');
  }

  getCategoriesByWord(value: string): void {
    this.categoriesByWord$ = this.store.select(CategoriesSelectors.categories).pipe(
      switchMap((categories) => {
        return of(
          categories.filter((category) =>
            category.subCategories.find((subCategory) =>
              subCategory.name.toLowerCase().includes(value.toLowerCase()),
            ),
          ),
        );
      }),
    );
  }
}
