import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CoreDataService } from '../services/core-data.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input() isLoginFormShown$$ = new BehaviorSubject(false);

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  constructor(
    public coreDataService: CoreDataService,
    public httpService: HttpService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');
    this.areCredentialsInvalid$$ = this.httpService.areCredentialsInvalid$$;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open');
  }

  loginUser(form: NgForm): void {
    this.httpService.loginUser(form).subscribe((token) => {
      if (token) {
        this.coreDataService.hideLoginForm();
        this.httpService.getUserInfo(token);
      }
    });
  }
}
