import { TestBed } from '@angular/core/testing';

import { EmployeemanagementService } from './employeemanagement.service';

describe('EmployeemanagementService', () => {
  let service: EmployeemanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeemanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
