import { TestBed } from '@angular/core/testing';

import { MailnotificationService } from './mailnotification.service';

describe('MailnotificationService', () => {
  let service: MailnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
