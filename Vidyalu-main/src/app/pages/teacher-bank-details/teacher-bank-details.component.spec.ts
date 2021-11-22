import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBankDetailsComponent } from './teacher-bank-details.component';

describe('TeacherBankDetailsComponent', () => {
  let component: TeacherBankDetailsComponent;
  let fixture: ComponentFixture<TeacherBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
