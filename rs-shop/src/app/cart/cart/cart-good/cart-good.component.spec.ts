import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGoodComponent } from './cart-good.component';

describe('CartGoodComponent', () => {
  let component: CartGoodComponent;
  let fixture: ComponentFixture<CartGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartGoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
