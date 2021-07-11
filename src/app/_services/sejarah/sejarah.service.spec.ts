import { TestBed } from '@angular/core/testing';

import { SejarahService } from './sejarah.service';

describe('SejarahService', () => {
  let service: SejarahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SejarahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
