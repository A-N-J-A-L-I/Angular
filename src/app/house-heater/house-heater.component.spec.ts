import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseHeaterComponent } from './house-heater.component';

describe('HouseHeaterComponent', () => {
  let component: HouseHeaterComponent;
  let fixture: ComponentFixture<HouseHeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseHeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseHeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
