import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmpresaService,
  AlertService,
  AccountService,
  EgresoLubricentroService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { EgresosLubricentro, Empresa, Sucursal, User } from '@app/_models';

@Component({
  selector: 'app-lubricentro-form',
  templateUrl: './lubricentro-form.component.html',
  styleUrls: ['./lubricentro-form.component.scss'],
})
export class LubricentroFormComponent implements OnInit {
  form: FormGroup;
  id: string;
  empresas = null;
  empresa = new Empresa();
  sucursales = null;
  isAddMode: boolean;
  idEmpresa = null;
  submitted = false;
  loading = true;
  usuario: User;
  idUsuario = null;
  idIngreso = null;
  egreso = new EgresosLubricentro();
  respuesta;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private egresoLubricentroService: EgresoLubricentroService,
    private accountService: AccountService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }
  envv(e) {
    this.loading = e;
  }
  resp(e) {
    this.respuesta = e;
  }
  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((x) => {
        for (let i = 0; i < x.length; i++) {
          x[i].Sucursals = Object.values(x[i].Sucursals);
        }
        this.empresas = x;
      });
    this.empresaService
      .getByIdWithSucursales(this.idEmpresa)
      .pipe(first())
      .subscribe((x) => {
        x.Sucursals = Object.values(x.Sucursals);

        this.empresa = x;
        console.log(this.empresa);
      });
    /* TODO AGREGAR campos numeroBoleta, Tipo Documento(boleta, factura), documento */

    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoEgreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      idSucursal: ['', Validators.required],
      idUsuario: this.idUsuario,
      idIngreso: this.idIngreso,
    });

    if (!this.isAddMode) {
      this.egresoLubricentroService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.fecha.setValue(x.fecha);
          this.f.monto.setValue(x.monto);
          this.f.descripcion.setValue(x.descripcion);
          this.f.idSucursal.setValue(x.idSucursal);
          this.f.idUsuario.setValue(this.idUsuario);
          this.f.idIngreso.setValue(this.idIngreso);
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
      this.createEgreso();
    } else {
      this.updateEgreso();
    }
  }

  private createEgreso() {
    console.log(this.respuesta);
    this.egreso.RespaldoEgresoLubricentros = [];
    this.egreso.fecha = this.form.value.fecha;
    this.egreso.monto = this.form.value.monto;
    this.egreso.descripcion = this.form.value.descripcion;
    this.egreso.responsable = this.form.value.responsable;
    this.egreso.idSucursal = this.form.value.idSucursal;
    this.egreso.idUsuario = this.form.value.idUsuario;
    this.egreso.tipoEgreso = this.form.value.tipoEgreso;
    this.egreso.idIngreso = this.form.value.idIngreso;
    for (let i = 0; i < this.respuesta.length; i++) {
      this.egreso.RespaldoEgresoLubricentros.push({ url: this.respuesta[i] });
    }

    console.log(this.egreso);
    this.egresoLubricentroService
      .create(this.egreso)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Egreso creado con exito', {
            keepAfterRouteChange: true,
          });
          this.loading = false;
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
  private updateEgreso() {
    this.egresoLubricentroService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Egreso editado con Exito', {
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
