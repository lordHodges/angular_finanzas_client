import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss'],
})
export class EmpresaFormComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  empresas = null;
  idEmpresa: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => (this.empresas = empresas));

    this.form = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      rut: ['', Validators.required],
      descripcion: ['', Validators.required],
      giro: ['', Validators.required],
      actividad: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.empresaService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.razonSocial.setValue(x.razonSocial);
          this.f.rut.setValue(x.rut);
          this.f.descripcion.setValue(x.descripcion);
          this.f.giro.setValue(x.giro);
          this.f.actividad.setValue(x.actividad);
          this.f.direccion.setValue(x.direccion);
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
      this.createEmpresa();
    } else {
      this.updateEmpresa();
    }
  }
  private createEmpresa() {
    this.empresaService
      .create(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Empresa creado con exito', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  private updateEmpresa() {
    this.empresaService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Empresa editado con Exito', {
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
