import { TestBed } from '@angular/core/testing';

import { ServiceCleanService } from './service-clean.service';

describe('ServiceCleanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceCleanService = TestBed.get(ServiceCleanService);
    expect(service).toBeTruthy();
  });
});
