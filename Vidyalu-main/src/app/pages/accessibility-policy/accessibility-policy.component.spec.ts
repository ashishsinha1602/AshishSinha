import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityPolicyComponent } from './accessibility-policy.component';

describe('AccessibilityPolicyComponent', () => {
  let component: AccessibilityPolicyComponent;
  let fixture: ComponentFixture<AccessibilityPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessibilityPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilityPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
