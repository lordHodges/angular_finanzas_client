import { TestBed } from '@angular/core/testing';

import { CausasService } from './causas.service';

describe('CausasService', () => {
  let service: CausasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CausasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
