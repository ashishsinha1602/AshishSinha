import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBasedCourseListComponent } from './teacher-based-course-list.component';

describe('TeacherBasedCourseListComponent', () => {
  let component: TeacherBasedCourseListComponent;
  let fixture: ComponentFixture<TeacherBasedCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherBasedCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBasedCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
