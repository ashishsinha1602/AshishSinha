import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorDashboardComponent } from './counsellor-dashboard.component';

describe('CounsellorDashboardComponent', () => {
  let component: CounsellorDashboardComponent;
  let fixture: ComponentFixture<CounsellorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
