import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStep1Component } from './application-step1.component';

describe('ApplicationStep1Component', () => {
  let component: ApplicationStep1Component;
  let fixture: ComponentFixture<ApplicationStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
