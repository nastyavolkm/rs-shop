import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsBlockComponent } from './search-results-block.component';

describe('SearchResultsBlockComponent', () => {
  let component: SearchResultsBlockComponent;
  let fixture: ComponentFixture<SearchResultsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
