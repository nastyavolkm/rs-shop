import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  isCatalogShown$$ = new BehaviorSubject(false);

  constructor(private coreDataService: CoreDataService) {}

  ngOnInit(): void {
    this.isCatalogShown$$ = this.coreDataService.isCatalogShown$$;
  }
}
