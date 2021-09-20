import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoreDataService } from 'src/app/core/services/core-data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  city$!: Observable<string>;

  isLocationPopUpShown = false;

  constructor(private coreDataService: CoreDataService) {}

  ngOnInit(): void {
    this.city$ = this.coreDataService.getLocation();
  }

  toggleLocationPopUp(boolean: boolean) {
    this.isLocationPopUpShown = boolean;
  }

  changeLocation(newCity: string) {
    this.city$ = of(newCity);
  }
}
