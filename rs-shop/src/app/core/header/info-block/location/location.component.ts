import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  city!: string;

  isLocationPopUpShown = false;

  constructor() { }

  ngOnInit(): void {
    this.city = 'Минск';
  }

  toggleLocationPopUp(boolean: boolean) {
    this.isLocationPopUpShown = boolean;
  }

  changeLocation(newCity: string) {
    this.city = newCity;
  }

}
