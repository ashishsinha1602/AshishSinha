import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHelpComponent } from './teacher-help.component';

describe('TeacherHelpComponent', () => {
  let component: TeacherHelpComponent;
  let fixture: ComponentFixture<TeacherHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
