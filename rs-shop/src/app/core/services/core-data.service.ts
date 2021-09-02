import { Injectable } from '@angular/core';
import { coreData } from '../mock.header';

@Injectable()
export class CoreDataService {
  getOpenTime(): string {
    return coreData.openHours.openTime;
  }
  getCloseTime(): string {
    return coreData.openHours.closeTime;
  }

  getCitiesList(): string[] {
    return coreData.cities;
  }

  getViberNumber(): string {
    return coreData.contacts.viber;
  }

  getTelegramNumber(): string {
    return coreData.contacts.telegram;
  }

  getStaticNumber(): string {
    return coreData.contacts.static;
  }

  getLifeNumber(): string {
    return coreData.contacts.life;
  }

  getA1Number(): string {
    return coreData.contacts.a1;
  }

  getContacts(): [string, string][] {
    return Object.entries(coreData.contacts);
  }
}
