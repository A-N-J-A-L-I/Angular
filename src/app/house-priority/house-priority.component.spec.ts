import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePriorityComponent } from './house-priority.component';

describe('HousePriorityComponent', () => {
  let component: HousePriorityComponent;
  let fixture: ComponentFixture<HousePriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
