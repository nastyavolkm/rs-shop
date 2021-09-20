import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input() isLoginFormShown$$ = new BehaviorSubject(false);

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationShown$$ = new BehaviorSubject(false);

  constructor(
    public coreDataService: CoreDataService,
    public authService: AuthService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');
    this.areCredentialsInvalid$$ = this.authService.areCredentialsInvalid$$;
    this.isRegistrationShown$$ = this.authService.isRegistrationShown$$;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.areCredentialsInvalid$$.next(false);
  }

  loginUser(form: NgForm): void {
    this.authService.loginUser(form).subscribe((token) => {
      if (token) {
        this.authService.hideLoginForm();
        this.authService.getUserInfo(token).subscribe((user) => {
          this.authService.saveUser(user, token);
        });
      }
    });
  }
}
