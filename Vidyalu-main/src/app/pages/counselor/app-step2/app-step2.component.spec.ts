import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStep2Component } from './app-step2.component';

describe('AppStep2Component', () => {
  let component: AppStep2Component;
  let fixture: ComponentFixture<AppStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
