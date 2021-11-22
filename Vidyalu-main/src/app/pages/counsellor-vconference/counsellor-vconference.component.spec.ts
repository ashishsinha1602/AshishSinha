import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorVconferenceComponent } from './counsellor-vconference.component';

describe('CounsellorVconferenceComponent', () => {
  let component: CounsellorVconferenceComponent;
  let fixture: ComponentFixture<CounsellorVconferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorVconferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorVconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
