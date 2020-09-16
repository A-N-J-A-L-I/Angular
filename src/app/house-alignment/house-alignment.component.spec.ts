import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAlignmentComponent } from './house-alignment.component';

describe('HouseAlignmentComponent', () => {
  let component: HouseAlignmentComponent;
  let fixture: ComponentFixture<HouseAlignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseAlignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
