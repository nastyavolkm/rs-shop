import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IUser } from '../../../models/IUser.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
})
export class LoginInfoComponent implements OnInit {
  user$!: Observable<IUser | undefined>;

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    // this.user$ = this.authService.getCurrentUser();
    this.checkUser();
  }

  checkUser(): void {
    if (this.authService.getCurrentToken()) {
      this.user$ = this.store.pipe(select(UserSelectors.user));
    } else {
      this.user$ = of(undefined);
    }
  }
}
