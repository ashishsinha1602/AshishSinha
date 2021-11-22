import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStep3Component } from './application-step3.component';

describe('ApplicationStep3Component', () => {
  let component: ApplicationStep3Component;
  let fixture: ComponentFixture<ApplicationStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
