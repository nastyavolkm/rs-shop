import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUnLoggedUser } from '../../core/models/IUnLoggedUser.model';
import { IUser } from '../../core/models/IUser.model';
import { AuthService } from '../../core/services/auth.service';
import { CoreDataService } from '../../core/services/core-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  constructor(
    private coreDataservice: CoreDataService,
    private authService: AuthService,
    public location: Location,
  ) {}

  ngOnInit(): void {
    this.coreDataservice.isCartButtonActive$$.next(true);
    this.checkLogin();
  }

  ngOnDestroy(): void {
    this.coreDataservice.isCartButtonActive$$.next(false);
  }

  checkLogin(): void {
    this.user$ = this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user === undefined) {
          const unLoggedUser: IUnLoggedUser = {
            firstName: '',
            lastName: '',
            cart: [],
            favorites: [],
          };
          this.authService.saveUnLoggedUser(unLoggedUser);
          return this.authService.getUnLoggedUser();
        } else {
          return of(user);
        }
      }),
    );
  }
}
