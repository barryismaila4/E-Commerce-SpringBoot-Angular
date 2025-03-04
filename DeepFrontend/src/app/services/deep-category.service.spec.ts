import { TestBed } from '@angular/core/testing';

import { DeepCategoryService } from './deep-category.service';

describe('DeepCategoryService', () => {
  let service: DeepCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
