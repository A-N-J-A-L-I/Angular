import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseConsumptionComponent } from './house-consumption.component';

describe('HouseConsumptionComponent', () => {
  let component: HouseConsumptionComponent;
  let fixture: ComponentFixture<HouseConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
