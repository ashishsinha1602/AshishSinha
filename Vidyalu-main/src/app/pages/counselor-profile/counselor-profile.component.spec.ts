import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorProfileComponent } from './counselor-profile.component';

describe('CounselorProfileComponent', () => {
  let component: CounselorProfileComponent;
  let fixture: ComponentFixture<CounselorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounselorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
