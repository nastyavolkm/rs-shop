import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() isLoginFormShown$$ = new BehaviorSubject(false);

  constructor(
    public coreDataService: CoreDataService
  ) { }

  ngOnInit(): void {
  }

}
