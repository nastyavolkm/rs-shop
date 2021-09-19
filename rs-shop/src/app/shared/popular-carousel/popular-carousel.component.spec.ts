import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCarouselComponent } from './popular-carousel.component';

describe('PopularCarouselComponent', () => {
  let component: PopularCarouselComponent;
  let fixture: ComponentFixture<PopularCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
