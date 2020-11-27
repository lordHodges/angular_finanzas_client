import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmpresaService,
  AlertService,
  IngresoLubricentroService,
  AccountService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { Empresa, IngresosLubricentro, Sucursal, User } from '@app/_models';

@Component({
  selector: 'app-lubricentro-form',
  templateUrl: './lubricentro-form.component.html',
  styleUrls: ['./lubricentro-form.component.less'],
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
  idEgreso = null;
  respuesta;
  ingreso = new IngresosLubricentro();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private ingresoService: IngresoLubricentroService,
    private accountService: AccountService,
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
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      cliente: ['', Validators.required],
      tipoCliente: ['', Validators.required],
      tipoPago: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      ppu: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', Validators.required],
      kmActual: ['', Validators.required],
      kmProximo: ['', Validators.required],
      idSucursal: ['', Validators.required],
      descripcionIngreso: ['', Validators.required],
      nDocumento: ['', Validators.required],
      estadoPago: ['', Validators.required],
      nAutorizacion: [''],
      banco: [''],
      referenciaCliente: [''],
      referenciaOtros: [''],
      idUsuario: this.idUsuario,
      idEgreso: this.idEgreso,
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
    this.ingreso.RespaldoIngresoLubricentros = [];
    this.ingreso.fecha = this.form.value.fecha;
    this.ingreso.monto = this.form.value.monto;
    this.ingreso.tipoPago = this.form.value.tipoPago;
    this.ingreso.telefono = this.form.value.telefono;
    this.ingreso.correo = this.form.value.correo;
    this.ingreso.tipoVehiculo = this.form.value.correo;
    this.ingreso.ppu = this.form.value.ppu;
    this.ingreso.marca = this.form.value.marca;
    this.ingreso.modelo = this.form.value.modelo;
    this.ingreso.anio = this.form.value.anio;
    this.ingreso.kmActual = this.form.value.kmActual;
    this.ingreso.kmProximo = this.form.value.kmProximo;
    this.ingreso.cliente = this.form.value.cliente;
    this.ingreso.tipoCliente = this.form.value.tipoCliente;
    this.ingreso.idSucursal = this.form.value.idSucursal;
    this.ingreso.descripcionIngreso = this.form.value.descripcionIngreso;
    this.ingreso.nDocumento = this.form.value.nDocumento;
    this.ingreso.estadoPago = this.form.value.estadoPago;
    this.ingreso.idUsuario = this.form.value.idUsuario;
    this.ingreso.nAutorizacion = this.form.value.nAutorizacion;
    this.ingreso.banco = this.form.value.banco;

    if (this.form.value.referenciaCliente == 'Otros'){
      this.ingreso.referenciaCliente = this.form.value.referenciaOtros;
    } 
    else
    {
      this.ingreso.referenciaCliente = this.form.value.referenciaCliente;
    }

    let cadena = '';

    for (let i = 0; i < this.form.value.tipoIngreso.length; i++) {
      cadena = cadena + '' + this.form.value.tipoIngreso[i];
    }

    for (let i = 0; i < this.respuesta.length; i++) {
      this.ingreso.RespaldoIngresoLubricentros.push({ url: this.respuesta[i] });
    }
    this.ingreso.tipoIngreso = cadena;

    this.ingresoService
      .create(this.ingreso)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Los ingresos de Lubricentro han sido creados con exito', {
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
          this.alertService.success('Lubricentro editado con Exito', {
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
