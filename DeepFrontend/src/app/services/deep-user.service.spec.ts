import { TestBed } from '@angular/core/testing';

import { DeepUserService } from './deep-user.service';

describe('DeepUserService', () => {
  let service: DeepUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
