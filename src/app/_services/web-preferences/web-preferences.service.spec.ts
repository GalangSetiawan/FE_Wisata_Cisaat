import { TestBed } from '@angular/core/testing';

import { WebPreferencesService } from './web-preferences.service';

describe('WebPreferencesService', () => {
  let service: WebPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
