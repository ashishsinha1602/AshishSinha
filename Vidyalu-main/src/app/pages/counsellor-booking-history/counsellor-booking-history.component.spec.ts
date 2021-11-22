import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorBookingHistoryComponent } from './counsellor-booking-history.component';

describe('CounsellorBookingHistoryComponent', () => {
  let component: CounsellorBookingHistoryComponent;
  let fixture: ComponentFixture<CounsellorBookingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorBookingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
