import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmpresaService,
  AlertService,
  AccountService,
  EgresoFirmaService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { Empresa, RegistroEgresoFirma, Sucursal, User } from '@app/_models';
//import { RespaldosComponent } from '@app/registros/ingresos/hostal/respaldos/respaldos.component';

@Component({
  selector: 'app-firma-abogados-form',
  templateUrl: './firma-abogados-form.component.html',
  styleUrls: ['./firma-abogados-form.component.scss'],
})
export class FirmaAbogadosFormComponent implements OnInit {
  form: FormGroup;
  id: string;
  empresas = null;
  empresa = null;
  sucursales = null;
  isAddMode: boolean;
  idEmpresa = null;
  submitted = false;
  loading = true;
  usuario: User;
  idUsuario = null;
  respuesta;
  egreso = new RegistroEgresoFirma();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private accountService: AccountService,
    private egresoService: EgresoFirmaService
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

  ngOnInit(): void {
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;
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
        x.Sucursals = Object.values(x.Sucursals);

        this.empresa = x;

      });

    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoEgreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      idSucursal: ['', Validators.required],
      idUsuario: this.idUsuario,
    });

    if (!this.isAddMode) {
      this.egresoService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.fecha.setValue(x.fecha);
          this.f.monto.setValue(x.monto);
          this.f.descripcion.setValue(x.descripcion);
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
      this.createEgreso();
    } else {
      this.updateEgreso();
    }
  }
  private createEgreso() {

    this.egreso.RespaldoEgresos = [];
    this.egreso.fecha = this.form.value.fecha;
    this.egreso.monto = this.form.value.monto;
    this.egreso.descripcion = this.form.value.descripcion;
    this.egreso.responsable = this.form.value.responsable;
    this.egreso.idSucursal = this.form.value.idSucursal;
    this.egreso.idUsuario = this.form.value.idUsuario;
    this.egreso.tipoEgreso = this.form.value.tipoEgreso;
    for (let i = 0; i < this.respuesta.length; i++) {
      this.egreso.RespaldoEgresos.push({ url: this.respuesta[i] });
    }


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
  private updateEgreso() {
    this.egresoService
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
