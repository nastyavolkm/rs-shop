import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-location-pop-up',
  templateUrl: './location-pop-up.component.html',
  styleUrls: ['./location-pop-up.component.scss']
})
export class LocationPopUpComponent implements OnInit {
  @Input() city!: string;

  @Output() isShown = new EventEmitter<boolean>();

  @Output() newCity = new EventEmitter<string>();

  isListShown = false;

  cities: string[] = [];

  constructor(private coreDataService: CoreDataService) { }

  ngOnInit(): void {
    this.cities = this.coreDataService.getCitiesList();
  }

}
