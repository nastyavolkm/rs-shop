import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCategoriesBlockComponent } from './nav-categories-block.component';

describe('NavCategoriesBlockComponent', () => {
  let component: NavCategoriesBlockComponent;
  let fixture: ComponentFixture<NavCategoriesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCategoriesBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCategoriesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
