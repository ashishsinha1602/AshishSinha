import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSessionDetailsComponent } from './student-session-details.component';

describe('StudentSessionDetailsComponent', () => {
  let component: StudentSessionDetailsComponent;
  let fixture: ComponentFixture<StudentSessionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSessionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
