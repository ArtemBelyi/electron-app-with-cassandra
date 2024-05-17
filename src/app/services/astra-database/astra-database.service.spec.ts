import { TestBed } from '@angular/core/testing';

import { AstraDatabaseService } from './astra-database.service';

describe('AstraDatabaseService', () => {
  let service: AstraDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstraDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
