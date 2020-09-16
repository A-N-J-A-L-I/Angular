import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseHotWaterComponent } from './house-hot-water.component';

describe('HouseHotWaterComponent', () => {
  let component: HouseHotWaterComponent;
  let fixture: ComponentFixture<HouseHotWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseHotWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseHotWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
