import { TestBed } from '@angular/core/testing';

import { WebsiteInfoService } from './website-info.service';

describe('WebsiteInfoService', () => {
  let service: WebsiteInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
