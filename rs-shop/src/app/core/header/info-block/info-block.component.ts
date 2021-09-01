import { Component, OnInit } from '@angular/core';
import { CoreDataService } from '../../services/core-data.service';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements OnInit {

  openTime!: string;

  closeTime!: string;

  constructor(private coreDataService: CoreDataService) { }

  ngOnInit(): void {
    this.getOpenHours();
  }

  getOpenHours(): void {
    this.openTime = this.coreDataService.getOpenTime();
    this.closeTime = this.coreDataService.getCloseTime();
  }

}
