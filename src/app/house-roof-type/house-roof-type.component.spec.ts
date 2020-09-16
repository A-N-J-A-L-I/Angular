import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRoofTypeComponent } from './house-roof-type.component';

describe('HouseRoofTypeComponent', () => {
  let component: HouseRoofTypeComponent;
  let fixture: ComponentFixture<HouseRoofTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRoofTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRoofTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
