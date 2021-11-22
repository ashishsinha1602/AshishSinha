import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBookingHistoryComponent } from './teacher-booking-history.component';

describe('TeacherBookingHistoryComponent', () => {
  let component: TeacherBookingHistoryComponent;
  let fixture: ComponentFixture<TeacherBookingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherBookingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
