import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './carousel/carousel.component';
import { PopularCarouselComponent } from './popular-carousel/popular-carousel.component';


@NgModule({
  declarations: [
    CarouselComponent,
    PopularCarouselComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    CarouselModule,
  ],
  exports: [CarouselComponent, PopularCarouselComponent],
})
export class SharedModule {}
