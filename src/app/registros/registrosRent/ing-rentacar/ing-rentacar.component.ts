import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@app/_services/alert.service';
import { IngresosRentacarService } from '@app/_services/ingresos-rentacar.service';

@Component({
  selector: 'app-ing-rentacar',
  templateUrl: './ing-rentacar.component.html',
  styleUrls: ['./ing-rentacar.component.less'],
})
export class IngRentacarComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private alertService: AlertService,
    private servicioIngresoRentacar: IngresosRentacarService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    //validadcion de formulario
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      cliente: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      patente: ['', Validators.required],
      cantidadDias: ['', Validators.required],
      empresaCopago: ['', Validators.required],
    });
    if (!this.isAddMode) {
      this.servicioIngresoRentacar
        .mostrarPorId(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.fecha.setValue(x.fecha);
          this.f.monto.setValue(x.monto);
          this.f.cliente.setValue(x.cliente);
          this.f.patente.setValue(x.patente);
          this.f.marca.setValue(x.marca);
          this.f.modelo.setValue(x.modelo);
          this.f.cantidadDias.setValue(x.cantidadDias);
          this.f.empresaCopago.setValue(x.empresaCopago);
        });
    }
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.registrarIngreso();
    } else {
      this.editarIngreso();
    }
  }

  private registrarIngreso() {
    this.servicioIngresoRentacar
      .registrarIngreso(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Ingreso creado con exito', {
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
  private editarIngreso() {
    this.servicioIngresoRentacar
      .editarRegistro(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('edicion Exitosa', {
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
/*  */
