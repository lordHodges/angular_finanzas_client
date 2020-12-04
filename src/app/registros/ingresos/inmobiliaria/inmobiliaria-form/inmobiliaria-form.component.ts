import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmpresaService,
  AlertService,
  IngresoInmobiliariaService,
  AccountService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { Empresa, IngresosInmobiliaria, Sucursal, User } from '@app/_models';
@Component({
  selector: 'app-inmobiliaria-form',
  templateUrl: './inmobiliaria-form.component.html',
  styleUrls: ['./inmobiliaria-form.component.less']
})
export class InmobiliariaFormComponent implements OnInit {
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
  respuesta;
  ingreso = new IngresosInmobiliaria();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private ingresoService: IngresoInmobiliariaService,
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
      });
    /* TODO AGREGAR campos numeroBoleta, Tipo Documento(boleta, factura), documento */

    this.form = this.formBuilder.group({
      propiedad: ['', Validators.required],
      otraPropiedad: [''],
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      ingresoOtros: [''],
      descripcionIngreso: ['', Validators.required],
      idSucursal: ['', Validators.required],
      idUsuario: this.idUsuario,
    });
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
    console.log(this.respuesta);
    this.ingreso.RespaldoIngresoInmobiliaria = [];
    this.ingreso.fecha = this.form.value.fecha;
    this.ingreso.monto = this.form.value.monto;
    this.ingreso.idSucursal = this.form.value.idSucursal;
    this.ingreso.idUsuario = this.form.value.idUsuario;
    
    if (this.form.value.propiedad == 'Otros') {
      this.ingreso.propiedad = this.form.value.otraPropiedad;
    } else {
      this.ingreso.propiedad = this.form.value.propiedad;
    }
    
    if (this.form.value.tipoIngreso == 'Otros') {
      this.ingreso.tipoIngreso = this.form.value.ingresoOtros;
    } else {
      this.ingreso.tipoIngreso = this.form.value.tipoIngreso;
    }
    this.ingreso.descripcionIngreso = this.form.value.descripcionIngreso;
    let cadena = '';
    for (let i = 0; i < this.form.value.tipoIngreso.length; i++) {
      cadena = cadena + '' + this.form.value.tipoIngreso[i];
    }
    for (let i = 0; i < this.respuesta.length; i++) {
      this.ingreso.RespaldoIngresoInmobiliaria.push({ url: this.respuesta[i] });
    }
    this.ingreso.tipoIngreso = cadena;

    this.ingresoService
      .create(this.ingreso)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Ingreso Inmobiliaria creado con exito', {
            keepAfterRouteChange: true,
          });
          this.loading = false;
          // this.router.navigate(['#', { relativeTo: this.route }]);
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
          this.alertService.success('Ingreso editado con Exito', {
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

