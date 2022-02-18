import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteGoodComponent } from './favorite-good.component';

describe('FavoriteGoodComponent', () => {
  let component: FavoriteGoodComponent;
  let fixture: ComponentFixture<FavoriteGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteGoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
