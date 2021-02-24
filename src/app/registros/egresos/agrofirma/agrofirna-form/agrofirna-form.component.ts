import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import {
  AccountService,
  AlertService,
  EgresoAgrofirmaService,
} from '@app/_services';

@Component({
  selector: 'app-agrofirna-form',
  templateUrl: './agrofirna-form.component.html',
  styleUrls: ['./agrofirna-form.component.scss'],
})
export class AgrofirnaFormComponent implements OnInit {
  // valores de entrada
  idProyecto = null;
  usuario: User;
  idUsuario = null;
  nombreEmpresa = 'agrofirma';
  respaldoEgresos: any[] = [];
  // set Formulario
  form: FormGroup;
  respuesta;
  loading = true;
  submitted;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private egresoService: EgresoAgrofirmaService,
    private alertService: AlertService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params.idProyecto;

    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      tipoEgreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      idProyecto: this.idProyecto,
      idUsuario: this.idUsuario,
      RespaldoEgresos: this.respaldoEgresos,
    });
  }
  registrarEgreso(): void {
    for (let i = 0; i < this.respuesta.length; i++) {
      this.respaldoEgresos.push({ url: this.respuesta[i] });
    }
    this.form.value.RespaldoEgresos = this.respaldoEgresos;
    this.egresoService
      .create(this.form.value)
      .pipe()
      .subscribe(
        (egreso) => {

          this.alertService.success(' Creado con exito', {
            keepAfterRouteChange: false,
          });
          this.loading = false;
          this.ngOnInit();
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  envv(e): void {
    this.loading = e;
  }
  resp(e): void {
    this.respuesta = e;
  }
  get f(): any {
    return this.form.controls;
  }
}
