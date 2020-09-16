import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFinancialComponent } from './result-financial.component';

describe('ResultFinancialComponent', () => {
  let component: ResultFinancialComponent;
  let fixture: ComponentFixture<ResultFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
