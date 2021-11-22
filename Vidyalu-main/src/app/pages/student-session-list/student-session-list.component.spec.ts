import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSessionListComponent } from './student-session-list.component';

describe('StudentSessionListComponent', () => {
  let component: StudentSessionListComponent;
  let fixture: ComponentFixture<StudentSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSessionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
