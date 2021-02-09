import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  AlertService,
  BancoService,
  CuentasBancariasService,
  EmpresaService,
} from '@app/_services';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-cuentas-sucursal',
  templateUrl: './cuentas-sucursal.component.html',
  styleUrls: ['./cuentas-sucursal.component.scss'],
})
export class CuentasSucursalComponent implements OnInit, OnChanges {
  @Input()
  idEmpresa: string;
  sucursales = null;
  bancos = null;
  cuentas = null;
  changelog: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private cuentasService: CuentasBancariasService,
    private bancoService: BancoService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName of Object.keys(changes)) {
      console.log('onChanges');
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      console.log(to);
      this.idEmpresa = to;
      this.empresaService
        .getByIdWithSucursales(this.idEmpresa)
        .subscribe((empresa) => (this.sucursales = empresa.Sucursals));
      this.bancoService.getAll().subscribe((bancos) => (this.bancos = bancos));
    }
  }
  ngOnInit(): void {}
}
