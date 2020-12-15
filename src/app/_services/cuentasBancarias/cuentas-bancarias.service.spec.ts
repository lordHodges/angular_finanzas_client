import { TestBed } from '@angular/core/testing';

import { CuentasBancariasService } from './cuentas-bancarias.service';

describe('CuentasBancariasService', () => {
  let service: CuentasBancariasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasBancariasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
