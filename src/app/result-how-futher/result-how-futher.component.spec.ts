import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHowFutherComponent } from './result-how-futher.component';

describe('ResultHowFutherComponent', () => {
  let component: ResultHowFutherComponent;
  let fixture: ComponentFixture<ResultHowFutherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultHowFutherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHowFutherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
