import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isRegistrationSuccessful$$ = new BehaviorSubject(false);

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(form: NgForm): void {
    this.authService.registerUser(form).subscribe((token) => {
      if(token) {
        this.isRegistrationSuccessful$$.next(true);
        setTimeout(() => this.authService.isLoginFormShown$$.next(false), 3000);
        this.authService.getUserInfo(token).subscribe((user) => {
          this.authService.saveUser(user);
        });
      }
    })
  }

}
