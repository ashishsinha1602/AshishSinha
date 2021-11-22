import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorBankDetailsComponent } from './counsellor-bank-details.component';

describe('CounsellorBankDetailsComponent', () => {
  let component: CounsellorBankDetailsComponent;
  let fixture: ComponentFixture<CounsellorBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
