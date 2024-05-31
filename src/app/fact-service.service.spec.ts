import { TestBed } from '@angular/core/testing';

import { FactServiceService } from './fact-service.service';

describe('FactServiceService', () => {
  let service: FactServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
