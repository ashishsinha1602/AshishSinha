import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPurchaseCourseComponent } from './student-purchase-course.component';

describe('StudentPurchaseCourseComponent', () => {
  let component: StudentPurchaseCourseComponent;
  let fixture: ComponentFixture<StudentPurchaseCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPurchaseCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPurchaseCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
