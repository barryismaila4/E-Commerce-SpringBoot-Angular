import { TestBed } from '@angular/core/testing';

import { DeepProduitService } from './deep-produit.service';

describe('DeepProduitService', () => {
  let service: DeepProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
