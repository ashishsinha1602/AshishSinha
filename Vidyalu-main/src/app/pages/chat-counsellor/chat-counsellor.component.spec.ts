import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCounsellorComponent } from './chat-counsellor.component';

describe('ChatCounsellorComponent', () => {
  let component: ChatCounsellorComponent;
  let fixture: ComponentFixture<ChatCounsellorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCounsellorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCounsellorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
