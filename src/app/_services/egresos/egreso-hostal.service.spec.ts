import { TestBed } from '@angular/core/testing';

import { EgresoHostalService } from './egreso-hostal.service';

describe('EgresoHostalService', () => {
  let service: EgresoHostalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresoHostalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
