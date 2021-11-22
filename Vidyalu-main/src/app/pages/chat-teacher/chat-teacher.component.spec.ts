import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTeacherComponent } from './chat-teacher.component';

describe('ChatTeacherComponent', () => {
  let component: ChatTeacherComponent;
  let fixture: ComponentFixture<ChatTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
