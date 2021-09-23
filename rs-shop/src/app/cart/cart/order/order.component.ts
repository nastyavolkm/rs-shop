import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/goods/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() goods$!: Observable<IGood[]>;

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationSuccessful$$ = new BehaviorSubject(false);

  user$!: Observable<IUser | IUnLoggedUser | undefined>;

  isLogged$!: Observable<boolean>;

  formDelivery!: FormGroup;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.checkLogin();
    this.isLogged$ = this.authService.isLogged();
    this.formDelivery = this.formBuilder.group({
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
      phone: new FormControl('', [Validators.required, Validators.pattern('^\\+[0-9]*')]),
      timeToDeliver: new FormControl({ disabled: true }, Validators.required),
      comment: new FormControl('', Validators.maxLength(250)),
    });
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
    if (this.formDelivery.valid) {
      console.log('hello');
      const user$ = this.orderService.getLoggedUser();
      this.orderService.submitOrder(this.formDelivery, user$);
      this.formDelivery.reset();
    } else {
      this.validateAllFormFields(this.formDelivery);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    return !this.formDelivery.get(field)!.valid && this.formDelivery.get(field)!.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }
}
