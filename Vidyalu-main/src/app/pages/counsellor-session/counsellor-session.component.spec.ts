import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorSessionComponent } from './counsellor-session.component';

describe('CounsellorSessionComponent', () => {
  let component: CounsellorSessionComponent;
  let fixture: ComponentFixture<CounsellorSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
