import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/_components';
import { ProyectoAgrofirma } from '@app/_models';
import {
  AccountService,
  AlertService,
  ProyectoAgrofirmaService,
} from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-agrofirma-form',
  templateUrl: './agrofirma-form.component.html',
  styleUrls: ['./agrofirma-form.component.scss'],
})
export class AgrofirmaFormComponent implements OnInit {
  @Input()
  idProyecto: string | number;
  changelog: string[] = [];

  idUsuario = null;
  submitted = false;
  usuario = null;
  form: FormGroup;
  proyecto = new ProyectoAgrofirma();
  proyectos: ProyectoAgrofirma[];
  isAddMode: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private proyectoService: ProyectoAgrofirmaService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params.idProyecto;
    this.isAddMode = !this.idProyecto;

    this.proyectoService
      .getAll()
      .pipe()
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
        console.log(this.proyectos);
      });
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      geoLocalizacion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      estado: ['', Validators.required],
      totalInversion: ['', Validators.required],
      capitalInicial: ['', Validators.required],
      idUsuario: this.idUsuario,
    });
    if (!this.isAddMode) {
      this.proyectoService
        .getOne(this.idProyecto)
        .pipe(first())
        .subscribe((proyecto) => {
          this.f.nombre.setValue(proyecto.nombre);
          this.f.ubicacion.setValue(proyecto.ubicacion);
          this.f.geoLocalizacion.setValue(proyecto.geoLocalizacion);
          this.f.fechaInicio.setValue(proyecto.fechaInicio);
          this.f.estado.setValue(proyecto.estado);
          this.f.totalInversion.setValue(proyecto.totalInversion);
          this.f.capitalInicial.setValue(proyecto.capitalInicial);
          this.f.idUsuario.setValue(proyecto.idUsuario);
        });
    }
  }
  edit(id): void {
    this.ngOnInit();
    this.idProyecto = id;
    this.router.navigate(['/ingresos/agrofirma/edit/', this.idProyecto]);
  }
  guardar(): void {
    if (this.isAddMode) {
      this.guardarProyecto();
    } else {
      this.actualizarProyecto();
    }
  }

  guardarProyecto(): void {
    this.proyecto = new ProyectoAgrofirma();
    this.proyecto.nombre = this.f.nombre.value;
    this.proyecto.fechaInicio = this.f.fechaInicio.value;
    this.proyecto.capitalInicial = this.f.capitalInicial.value;
    this.proyecto.estado = this.f.estado.value;
    this.proyecto.geoLocalizacion = this.f.geoLocalizacion.value;
    this.proyecto.idUsuario = this.f.idUsuario.value;
    this.proyecto.totalInversion = this.f.totalInversion.value;
    this.proyecto.ubicacion = this.f.ubicacion.value;
    this.proyectoService
      .create(this.proyecto)
      .pipe()
      .subscribe((proyecto) => {
        this.ngOnInit();
      });
  }
  actualizarProyecto(): void {
    this.proyecto = new ProyectoAgrofirma();
    this.proyecto.nombre = this.f.nombre.value;
    this.proyecto.fechaInicio = this.f.fechaInicio.value;
    this.proyecto.capitalInicial = this.f.capitalInicial.value;
    this.proyecto.estado = this.f.estado.value;
    this.proyecto.geoLocalizacion = this.f.geoLocalizacion.value;
    this.proyecto.idUsuario = this.f.idUsuario.value;
    this.proyecto.totalInversion = this.f.totalInversion.value;
    this.proyecto.ubicacion = this.f.ubicacion.value;
    this.proyectoService
      .update(this.idProyecto, this.proyecto)
      .pipe()
      .subscribe((proyecto) => {
        this.ngOnInit();
      });
  }
  get f(): any {
    return this.form.controls;
  }
}
