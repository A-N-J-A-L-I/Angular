import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTypicalDayComponent } from './result-typical-day.component';

describe('ResultTypicalDayComponent', () => {
  let component: ResultTypicalDayComponent;
  let fixture: ComponentFixture<ResultTypicalDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultTypicalDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTypicalDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
