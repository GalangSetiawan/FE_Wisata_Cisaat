import { TestBed } from '@angular/core/testing';

import { BeritaExclService } from './berita-excl.service';

describe('BeritaExclService', () => {
  let service: BeritaExclService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeritaExclService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
