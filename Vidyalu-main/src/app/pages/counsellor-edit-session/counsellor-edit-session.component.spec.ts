import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorEditSessionComponent } from './counsellor-edit-session.component';

describe('CounsellorEditSessionComponent', () => {
  let component: CounsellorEditSessionComponent;
  let fixture: ComponentFixture<CounsellorEditSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorEditSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorEditSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
