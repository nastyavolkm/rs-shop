import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToken } from 'src/app/core/models/IToken.model';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/goods/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationSuccessful$$ = new BehaviorSubject(false);

  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  token!: IToken | undefined;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.checkLogin();
    this.token = this.authService.getCurrentToken();
  }

  registerUser(form: NgForm): void {
    this.authService.registerUser(form).subscribe((token) => {
      if (token) {
        this.isRegistrationSuccessful$$.next(true);
        this.store.dispatch(UserActions.getUser({ token: token }));
        this.user$ = this.store.pipe(select(UserSelectors.user));
      }
    });
  }
}
