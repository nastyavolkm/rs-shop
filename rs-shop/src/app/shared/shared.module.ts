import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './carousel/carousel.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { PopularCarouselComponent } from './popular-carousel/popular-carousel.component';

@NgModule({
  declarations: [CarouselComponent, PopularCarouselComponent, DateTimePickerComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  exports: [CarouselComponent, PopularCarouselComponent, DateTimePickerComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }],
})
export class SharedModule {}
