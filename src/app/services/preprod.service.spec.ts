import { TestBed } from '@angular/core/testing';

import { PreprodService } from './preprod.service';

describe('PreprodService', () => {
  let service: PreprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
