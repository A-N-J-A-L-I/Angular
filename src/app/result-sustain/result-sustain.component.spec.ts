import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSustainComponent } from './result-sustain.component';

describe('ResultSustainComponent', () => {
  let component: ResultSustainComponent;
  let fixture: ComponentFixture<ResultSustainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSustainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSustainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
