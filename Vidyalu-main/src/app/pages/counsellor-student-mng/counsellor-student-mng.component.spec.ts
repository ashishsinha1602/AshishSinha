import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorStudentMngComponent } from './counsellor-student-mng.component';

describe('CounsellorStudentMngComponent', () => {
  let component: CounsellorStudentMngComponent;
  let fixture: ComponentFixture<CounsellorStudentMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorStudentMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorStudentMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
