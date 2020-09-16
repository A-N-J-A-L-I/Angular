import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowFutherComponent } from './how-futher.component';

describe('HowFutherComponent', () => {
  let component: HowFutherComponent;
  let fixture: ComponentFixture<HowFutherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowFutherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowFutherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
