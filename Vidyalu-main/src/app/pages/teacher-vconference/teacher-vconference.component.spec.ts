import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherVconferenceComponent } from './teacher-vconference.component';

describe('TeacherVconferenceComponent', () => {
  let component: TeacherVconferenceComponent;
  let fixture: ComponentFixture<TeacherVconferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherVconferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherVconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
