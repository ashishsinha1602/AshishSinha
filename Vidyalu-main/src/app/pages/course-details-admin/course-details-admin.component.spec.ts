import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsAdminComponent } from './course-details-admin.component';

describe('CourseDetailsAdminComponent', () => {
  let component: CourseDetailsAdminComponent;
  let fixture: ComponentFixture<CourseDetailsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
