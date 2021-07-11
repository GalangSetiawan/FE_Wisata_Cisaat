import { TestBed } from '@angular/core/testing';

import { PaketWisataService } from './paket-wisata.service';

describe('PaketWisataService', () => {
  let service: PaketWisataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaketWisataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
