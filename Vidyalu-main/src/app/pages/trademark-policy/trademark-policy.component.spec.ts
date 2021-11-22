import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkPolicyComponent } from './trademark-policy.component';

describe('TrademarkPolicyComponent', () => {
  let component: TrademarkPolicyComponent;
  let fixture: ComponentFixture<TrademarkPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademarkPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
