import { Component, OnInit } from '@angular/core';
import { CoreDataService } from '../services/core-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contacts: [string, string][] =[];

  constructor(private coreDataService: CoreDataService) {}


  ngOnInit(): void {
    this.contacts = this.coreDataService.getContacts();
  }
}
