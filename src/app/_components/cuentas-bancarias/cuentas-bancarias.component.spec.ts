import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBancariasComponent } from './cuentas-bancarias.component';

describe('CuentasBancariasComponent', () => {
  let component: CuentasBancariasComponent;
  let fixture: ComponentFixture<CuentasBancariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasBancariasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasBancariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
