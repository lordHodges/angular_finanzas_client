import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmpresaService,
  AlertService,
  IngresoHostalService,
  AccountService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { Empresa, Sucursal, User } from '@app/_models';

@Component({
  selector: 'app-hostal-form',
  templateUrl: './hostal-form.component.html',
  styleUrls: ['./hostal-form.component.less'],
})
export class HostalFormComponent implements OnInit {
  form: FormGroup;
  id: string;
  empresas = null;
  empresa = new Empresa();
  sucursales = null;
  isAddMode: boolean;
  idEmpresa = null;
  submitted = false;
  loading = false;
  usuario: User;
  idUsuario = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private ingresoService: IngresoHostalService,
    private accountService: AccountService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params['idEmpresa'];
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((x) => {
        for (let i = 0; i < x.length; i++) {
          x[i]['Sucursals'] = Object.values(x[i]['Sucursals']);
        }
        this.empresas = x;
      });
    this.empresaService
      .getByIdWithSucursales(this.idEmpresa)
      .pipe(first())
      .subscribe((x) => {
        x['Sucursals'] = Object.values(x['Sucursals']);

        this.empresa = x;
        console.log(this.empresa);
      });
    /* TODO AGREGAR campos numeroBoleta, Tipo Documento(boleta, factura), documento */

    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      cliente: ['', Validators.required],
      tipoCliente: ['', Validators.required],
      tipoPago: ['', Validators.required],
      idSucursal: ['', Validators.required],
      idUsuario: this.idUsuario,
    });

    if (!this.isAddMode) {
      this.form = this.formBuilder.group({
        fecha: [],
        monto: [],
        tipoIngreso: [],
        cliente: [],
        tipoCliente: [],
        tipoPago: [],
        idSucursal: [],
        idUsuario: this.idUsuario,
      });
      this.ingresoService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.fecha.setValue(x.fecha);
          this.f.monto.setValue(x.monto);
          this.f.tipoIngreso.setValue(x.tipoIngreso);
          this.f.cliente.setValue(x.cliente);
          this.f.tipoCliente.setValue(x.tipoCliente);
          this.f.tipoPago.setValue(x.tipoPago);
          this.f.idSucursal.setValue(x.idSucursal);
          this.f.idUsuario.setValue(this.idUsuario);
        });
    }
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createIngreso();
    } else {
      this.updateIngreso();
    }
  }
  private createIngreso() {
    this.ingresoService
      .create(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Sucursal creado con exito', {
            keepAfterRouteChange: true,
          });
          this.loading = false;
          this.router.navigate(['', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
  private updateIngreso() {
    this.ingresoService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Sucursal editado con Exito', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
