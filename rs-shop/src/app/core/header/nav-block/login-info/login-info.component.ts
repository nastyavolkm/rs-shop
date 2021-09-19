import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../models/IUser.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
})
export class LoginInfoComponent implements OnInit {
  user$!: Observable<IUser | undefined>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser();
  }
}
