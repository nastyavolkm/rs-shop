import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedGoodComponent } from './detailed-good.component';

describe('DetailedGoodComponent', () => {
  let component: DetailedGoodComponent;
  let fixture: ComponentFixture<DetailedGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedGoodComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
