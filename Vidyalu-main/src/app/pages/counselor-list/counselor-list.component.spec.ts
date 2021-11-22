import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorListComponent } from './counselor-list.component';

describe('CounselorListComponent', () => {
  let component: CounselorListComponent;
  let fixture: ComponentFixture<CounselorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounselorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
