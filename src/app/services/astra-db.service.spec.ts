import { TestBed } from '@angular/core/testing';

import { AstraDbService } from './astra-db.service';

describe('AstraDbService', () => {
  let service: AstraDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstraDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
