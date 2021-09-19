import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ILocation } from 'src/app/core/models/ILocation.model';
import { CoreDataService } from 'src/app/core/services/core-data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  location$!: Observable<ILocation>;

  city$!: Observable<string>;

  isLocationPopUpShown = false;

  constructor(private coreDataService: CoreDataService) {}

  ngOnInit(): void {
    this.city$ = this.coreDataService
      .getLocation()
      .pipe(switchMap((location) => of(location.city)));
  }

  toggleLocationPopUp(boolean: boolean) {
    this.isLocationPopUpShown = boolean;
  }

  changeLocation(newCity: string) {
    this.city$ = of(newCity);
  }
}
