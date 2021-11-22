import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorHelpComponent } from './counsellor-help.component';

describe('CounsellorHelpComponent', () => {
  let component: CounsellorHelpComponent;
  let fixture: ComponentFixture<CounsellorHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
