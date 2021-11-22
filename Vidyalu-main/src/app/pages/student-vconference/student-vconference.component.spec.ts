import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVconferenceComponent } from './student-vconference.component';

describe('StudentVconferenceComponent', () => {
  let component: StudentVconferenceComponent;
  let fixture: ComponentFixture<StudentVconferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentVconferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentVconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
