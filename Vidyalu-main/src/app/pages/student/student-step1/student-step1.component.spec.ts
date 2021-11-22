import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStep1Component } from './student-step1.component';

describe('StudentStep1Component', () => {
  let component: StudentStep1Component;
  let fixture: ComponentFixture<StudentStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
