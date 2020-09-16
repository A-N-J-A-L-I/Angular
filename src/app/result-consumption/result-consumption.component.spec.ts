import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultConsumptionComponent } from './result-consumption.component';

describe('ResultConsumptionComponent', () => {
  let component: ResultConsumptionComponent;
  let fixture: ComponentFixture<ResultConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
