import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresosRentacar, Empresa, User } from '@app/_models';
import {
  AccountService,
  AlertService,
  EgresoRentacarService,
  EmpresaService,
} from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-rentacar-form',
  templateUrl: './rentacar-form.component.html',
  styleUrls: ['./rentacar-form.component.less'],
})
export class RentacarFormComponent implements OnInit {
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
  egreso = new EgresosRentacar();
  respuesta;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private accountService: AccountService,
    private egresoService: EgresoRentacarService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }
  envv(e): void {
    this.loading = e;
  }
  resp(e): void {
    this.respuesta = e;
  }

  ngOnInit(): void {
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
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoEgreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      idSucursal: ['', Validators.required],
      idArriendo: [''],
      idUsuario: this.idUsuario,
    });
  }

  get f(): any {
    return this.form.controls;
  }
  onSubmit(): void {
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
  private createEgreso(): void {
    console.log(this.respuesta);
    this.egreso.RespaldoEgresos = [];
    this.egreso.fecha = this.form.value.fecha;
    this.egreso.monto = this.form.value.monto;
    this.egreso.descripcion = this.form.value.descripcion;
    this.egreso.responsable = this.form.value.responsable;
    this.egreso.idSucursal = this.form.value.idSucursal;
    this.egreso.idUsuario = this.form.value.idUsuario;
    this.egreso.tipoEgreso = this.form.value.tipoEgreso;
    this.egreso.idArriendo = this.form.value.idArriendo;

    for (let i = 0; i < this.respuesta.length; i++) {
      this.egreso.RespaldoEgresos.push({ url: this.respuesta[i] });
    }

    console.log(this.egreso);
    this.egresoService
      .create(this.egreso)
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
  private updateEgreso(): void {}
}
