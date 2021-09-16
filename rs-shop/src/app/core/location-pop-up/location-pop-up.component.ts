import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-location-pop-up',
  templateUrl: './location-pop-up.component.html',
  styleUrls: ['./location-pop-up.component.scss']
})
export class LocationPopUpComponent implements OnInit, OnDestroy {
  @Input() city!: string | undefined;

  @Output() isShown = new EventEmitter<boolean>();

  @Output() newCity = new EventEmitter<string>();

  isListShown = false;

  cities: string[] = [];

  constructor(private coreDataService: CoreDataService,
    private renderer: Renderer2)
      { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');
    this.cities = this.coreDataService.getCitiesList();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open');
  }

}
