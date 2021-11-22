import { TestBed } from '@angular/core/testing';

import { CounsellorGuard } from './counsellor.guard';

describe('CounsellorGuard', () => {
  let guard: CounsellorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CounsellorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
