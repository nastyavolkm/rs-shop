import { Component, OnInit } from '@angular/core';
import { CoreDataService } from 'src/app/core/services/core-data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  viber!: string;

  telegram!: string;

  staticPhone!: string;

  a1!: string;

  life!: string;

  isAdditionalContactsShown = false;

  constructor(private coreDataService: CoreDataService) { }

  ngOnInit(): void {
    this.viber = this.coreDataService.getViberNumber();
    this.telegram = this.coreDataService.getTelegramNumber();
    this.life = this.coreDataService.getLifeNumber();
    this.staticPhone = this.coreDataService.getStaticNumber();
    this.a1 = this.coreDataService.getA1Number();
  }

}
