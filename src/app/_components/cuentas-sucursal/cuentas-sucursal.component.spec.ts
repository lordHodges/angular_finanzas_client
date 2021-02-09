import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasSucursalComponent } from './cuentas-sucursal.component';

describe('CuentasSucursalComponent', () => {
  let component: CuentasSucursalComponent;
  let fixture: ComponentFixture<CuentasSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
