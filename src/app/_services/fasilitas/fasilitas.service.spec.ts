import { TestBed } from '@angular/core/testing';

import { FasilitasService } from './fasilitas.service';

describe('FasilitasService', () => {
  let service: FasilitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FasilitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
