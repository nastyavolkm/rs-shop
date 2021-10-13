import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
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

  user$!: Observable<IUser>;

  @Output() isOrderShown = new EventEmitter();

  @Output() clearCart = new EventEmitter();

  isOrderSubmitted = false;

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationSuccessful$$ = new BehaviorSubject(false);

  isLogged$!: Observable<boolean>;

  formDelivery!: FormGroup;

  details!: IDetail;

  isEditMode = false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private store: Store,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(UserSelectors.user));
    this.isLogged$ = this.authService.isLogged();
  }

  registerUser(form: NgForm): void {
    this.authService.registerUser(form).subscribe((token) => {
      if (token) {
        this.orderService.transferDataOfUnloggedUser(token);
        this.authService.deleteUnLoggedUser();
        this.isRegistrationSuccessful$$.next(true);
        this.store.dispatch(UserActions.getUser());
        this.isLogged$ = this.authService.isLogged();
      }
    });
  }

  getLastOrderDetails(): void {
    this.details = this.orderService.details;
  }
}
