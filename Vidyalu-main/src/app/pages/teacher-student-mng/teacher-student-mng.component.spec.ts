import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentMngComponent } from './teacher-student-mng.component';

describe('TeacherStudentMngComponent', () => {
  let component: TeacherStudentMngComponent;
  let fixture: ComponentFixture<TeacherStudentMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
