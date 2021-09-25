import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/goods/services/order.service';
import { UserActions } from 'src/app/redux/actions/userActions';
import { IGood } from 'src/app/redux/state/good.model';
import { IOrder } from '../models/IOrder.model';

@Component({
  selector: 'app-form-delivery',
  templateUrl: './form-delivery.component.html',
  styleUrls: ['./form-delivery.component.scss'],
})
export class FormDeliveryComponent implements OnInit {
  @Input() goods$!: Observable<IGood[]>;

  @Input() user$!: Observable<IUser>;

  @Input() order!: IOrder;

  @Output() isOrderSubmitted = new EventEmitter<boolean>();

  @Output() isOrderEdited = new EventEmitter<boolean>();

  @Output() isOrderShown = new EventEmitter();

  @Output() getDetails = new EventEmitter();

  @Input() isEditMode!: boolean;

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  formDelivery!: FormGroup;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  ngOnInit(): void {
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

  submitOrder(): void {
    if (this.formDelivery.valid) {
      if (this.isEditMode) {
        this.orderService.editOrder(this.formDelivery, this.order.id);
        this.isOrderEdited.emit(true);
        const token = this.authService.getCurrentToken();
        this.store.dispatch(UserActions.getUser({ token: token! }));
        this.getDetails.emit();
      } else {
        // const user$ = this.orderService.getLoggedUser();
        this.orderService.submitOrder(this.formDelivery, this.user$);
        this.isOrderSubmitted.emit(true);
        this.orderService.afterOrderSubmitted();
        const token = this.authService.getCurrentToken();
        this.store.dispatch(UserActions.getUser({ token: token! }));
        this.getDetails.emit();
      }
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
