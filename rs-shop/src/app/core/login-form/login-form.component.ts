import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  @Input() isLoginFormShown$$ = new BehaviorSubject(false);

  constructor(
    public coreDataService: CoreDataService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');
  }

  ngOnDestroy(): void {
  this.renderer.removeClass(document.body, 'modal-open');
}
}
