import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { UserActions } from 'src/app/redux/actions/userActions';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  isRegistrationSuccessful$$ = new BehaviorSubject(false);

  constructor(
    public authService: AuthService,
    private store: Store,
    private orderService: OrderService,
  ) {}

  registerUser(form: NgForm): void {
    this.authService.registerUser(form).subscribe((token) => {
      if (token) {
        this.orderService.transferDataOfUnloggedUser(token);
        this.authService.deleteUnLoggedUser();
        this.isRegistrationSuccessful$$.next(true);
        setTimeout(() => this.authService.isLoginFormShown$$.next(false), 3000);
        this.store.dispatch(UserActions.getUser({ token: token }));
      }
    });
  }
}
