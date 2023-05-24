import { TestBed } from '@angular/core/testing';

import { SfApiService } from './sf-api.service';

describe('SfApiService', () => {
  let service: SfApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
