import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBlockComponent } from './nav-block.component';

describe('NavBlockComponent', () => {
  let component: NavBlockComponent;
  let fixture: ComponentFixture<NavBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
