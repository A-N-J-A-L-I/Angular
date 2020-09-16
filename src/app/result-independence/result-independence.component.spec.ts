import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultIndependenceComponent } from './result-independence.component';

describe('ResultIndependenceComponent', () => {
  let component: ResultIndependenceComponent;
  let fixture: ComponentFixture<ResultIndependenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultIndependenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultIndependenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
