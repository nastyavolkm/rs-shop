import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreDataService } from '../../services/core-data.service';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit {

  isSearchActive = false;

  isButtonActive = false;

  value = '';

  constructor(public coreDataService: CoreDataService) { }

  ngOnInit(): void {
  }

}
