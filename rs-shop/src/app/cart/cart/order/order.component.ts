import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
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

  isLogged$!: Observable<boolean>;

  formDelivery = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
    ]),
    phone: new FormControl('+375', [Validators.required, Validators.pattern('^\\+[0-9]*')]),
    timeToDeliver: new FormControl({ disabled: true }, Validators.required),
    comment: new FormControl('', Validators.maxLength(250)),
  });

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.checkLogin();
    this.isLogged$ = this.authService.isLogged();
  }

  registerUser(form: NgForm): void {
    this.authService.registerUser(form).subscribe((token) => {
      if (token) {
        this.isRegistrationSuccessful$$.next(true);
        this.store.dispatch(UserActions.getUser({ token: token }));
        this.user$ = this.store.pipe(select(UserSelectors.user));
        this.isLogged$ = this.authService.isLogged();
      }
    });
  }

  submitOrder(): void {
    this.orderService.submitOrder(this.formDelivery.value);
    this.formDelivery.reset();
  }
}
