import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent {
  @ViewChild('picker') picker: any;

  public disabled = false;

  public showSpinners = true;

  public showSeconds = false;

  public touchUi = false;

  public enableMeridian = false;

  public minDate!: Date;

  public maxDate!: Date;

  public stepHour = 1;

  public stepMinute = 1;

  public stepSecond = 1;

  public color: ThemePalette = 'primary';

  public disableMinute = false;

  public hideTime = false;

  public dateControl = new FormControl(null);

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];
}
