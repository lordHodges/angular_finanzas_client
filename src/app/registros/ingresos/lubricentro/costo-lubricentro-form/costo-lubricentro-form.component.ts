import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmpresaService,
  AlertService,
  AccountService,
  CostoLubricentroService,

} from '@app/_services';
import { first } from 'rxjs/operators';
import { Empresa, CostoLubricentro, Sucursal, User } from '@app/_models';

@Component({
  selector: 'app-costo-lubricentro-form',
  templateUrl: './costo-lubricentro-form.component.html',
  styleUrls: ['./costo-lubricentro-form.component.less'],
})
export class CostoLubricentroFormComponent implements OnInit {

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
  idCosto = null;
  costo = new CostoLubricentro();
  respuesta;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private costoLubricentroService: CostoLubricentroService,
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
        console.log(this.empresa);
      });
    /* TODO AGREGAR campos numeroBoleta, Tipo Documento(boleta, factura), documento */

    this.form = this.formBuilder.group({
      idSucursal: ['', Validators.required],
      idUsuario: this.idUsuario,
      idCosto: this.idCosto,
    });

    if (!this.isAddMode) {
      this.costoLubricentroService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.idSucursal.setValue(x.idSucursal);
          this.f.idUsuario.setValue(this.idUsuario);
          this.f.idCosto.setValue(this.idCosto);
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
      this.createCosto();
    } else {
      this.updateCosto();
    }
  }

  private createCosto() {
    console.log(this.respuesta);
    this.costo.RespaldoCostoLubricentros = [];
    this.costo.idSucursal = this.form.value.idSucursal;
    this.costo.idUsuario = this.form.value.idUsuario;
    for (let i = 0; i < this.respuesta.length; i++) {
      this.costo.RespaldoCostoLubricentros.push({ url: this.respuesta[i] });
    }

    console.log(this.costo);
    this.costoLubricentroService
      .create(this.costo)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Sucursal creado con exito', {
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
  private updateCosto() {
    this.costoLubricentroService
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
