import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCounselingSessionComponent } from './create-counseling-session.component';

describe('CreateCounselingSessionComponent', () => {
  let component: CreateCounselingSessionComponent;
  let fixture: ComponentFixture<CreateCounselingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCounselingSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCounselingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
