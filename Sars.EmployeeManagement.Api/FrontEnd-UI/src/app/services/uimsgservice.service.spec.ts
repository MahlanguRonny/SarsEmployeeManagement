import { TestBed } from '@angular/core/testing';

import { UimsgserviceService } from './uimsgservice.service';

describe('UimsgserviceService', () => {
  let service: UimsgserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UimsgserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
