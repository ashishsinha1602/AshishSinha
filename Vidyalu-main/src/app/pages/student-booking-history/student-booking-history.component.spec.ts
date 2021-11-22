import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookingHistoryComponent } from './student-booking-history.component';

describe('StudentBookingHistoryComponent', () => {
  let component: StudentBookingHistoryComponent;
  let fixture: ComponentFixture<StudentBookingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBookingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
