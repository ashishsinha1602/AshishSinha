import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStep3Component } from './app-step3.component';

describe('AppStep3Component', () => {
  let component: AppStep3Component;
  let fixture: ComponentFixture<AppStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
