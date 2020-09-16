import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePitchComponent } from './house-pitch.component';

describe('HousePitchComponent', () => {
  let component: HousePitchComponent;
  let fixture: ComponentFixture<HousePitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
