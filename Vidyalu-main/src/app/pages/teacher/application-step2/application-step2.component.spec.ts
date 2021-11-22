import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStep2Component } from './application-step2.component';

describe('ApplicationStep2Component', () => {
  let component: ApplicationStep2Component;
  let fixture: ComponentFixture<ApplicationStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
