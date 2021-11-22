import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStep1Component } from './app-step1.component';

describe('AppStep1Component', () => {
  let component: AppStep1Component;
  let fixture: ComponentFixture<AppStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
