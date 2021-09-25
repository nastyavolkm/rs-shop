import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/goods/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';
import { IDetail } from '../models/IDetail.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() goods$!: Observable<IGood[]>;

  @Input() user$!: Observable<IUser | IUnLoggedUser | undefined>;

  @Output() isOrderShown = new EventEmitter();

  isOrderSubmitted = false;

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationSuccessful$$ = new BehaviorSubject(false);

  isLogged$!: Observable<boolean>;

  formDelivery!: FormGroup;

  details!: IDetail;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  ngOnInit(): void {
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
      const user$ = this.orderService.getLoggedUser();
      this.orderService.submitOrder(this.formDelivery, user$);
      this.isOrderSubmitted = true;
      this.isOrderShown.emit();
      this.getLastOrderDetails();
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

  getLastOrderDetails(): void {
    this.details = this.orderService.details;
  }
}
