import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseEnergyComponent } from './house-energy.component';

describe('HouseEnergyComponent', () => {
  let component: HouseEnergyComponent;
  let fixture: ComponentFixture<HouseEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
