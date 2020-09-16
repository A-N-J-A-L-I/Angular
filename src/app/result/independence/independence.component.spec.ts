import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependenceComponent } from './independence.component';

describe('IndependenceComponent', () => {
  let component: IndependenceComponent;
  let fixture: ComponentFixture<IndependenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
