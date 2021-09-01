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
}
