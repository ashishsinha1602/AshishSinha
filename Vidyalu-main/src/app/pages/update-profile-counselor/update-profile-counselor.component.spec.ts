import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileCounselorComponent } from './update-profile-counselor.component';

describe('UpdateProfileCounselorComponent', () => {
  let component: UpdateProfileCounselorComponent;
  let fixture: ComponentFixture<UpdateProfileCounselorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileCounselorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileCounselorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
