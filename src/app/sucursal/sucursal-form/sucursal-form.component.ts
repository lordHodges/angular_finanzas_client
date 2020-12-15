import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService, AlertService, SucursalService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursal-form.component.html',
  styleUrls: ['./sucursal-form.component.scss'],
})
export class SucursalFormComponent implements OnInit {
  form: FormGroup;
  id: string;
  idEmpresa: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  empresas = null;
  sucursales = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService,
    private sucursalService: SucursalService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => {
        this.empresas = empresas;
        console.log(this.empresas);
      });

    this.form = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      rut: [''],
      descripcion: [''],
      giro: [''],
      actividad: [''],
      direccion: [''],
      idEmpresa: ['', Validators.required],
    });
    if (!this.isAddMode) {
      this.sucursalService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.razonSocial.setValue(x.razonSocial);
          this.f.rut.setValue(x.rut);
          this.f.descripcion.setValue(x.descripcion);
          this.f.giro.setValue(x.giro);
          this.f.actividad.setValue(x.actividad);
          this.f.direccion.setValue(x.direccion);
          this.f.idEmpresa.setValue(x.idEmpresa);
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
      this.createSucursal();
    } else {
      this.updateSucursal();
    }
  }
  private createSucursal() {
    this.sucursalService
      .create(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Sucursal creado con exito', {
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

  private updateSucursal() {
    this.sucursalService
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
