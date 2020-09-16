import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRoofAreaComponent } from './house-roof-area.component';

describe('HouseRoofAreaComponent', () => {
  let component: HouseRoofAreaComponent;
  let fixture: ComponentFixture<HouseRoofAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRoofAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRoofAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
