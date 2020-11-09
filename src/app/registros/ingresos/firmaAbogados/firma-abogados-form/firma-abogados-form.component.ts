import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/_modal';
import { Cliente, User } from '@app/_models';
import {
  AccountService,
  AlertService,
  CausasService,
  ClienteService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { CausasListComponent } from '../causas-list/causas-list.component';

@Component({
  selector: 'app-firma-abogados-form',
  templateUrl: './firma-abogados-form.component.html',
  styleUrls: ['./firma-abogados-form.component.less'],
})
export class FirmaAbogadosFormComponent implements OnInit, OnDestroy {
  miFactory: ComponentFactory<any>;
  componentRef: ComponentRef<CausasListComponent> = null;
  @ViewChild('componenteDinamico', { read: ViewContainerRef })
  compDynamicContainer: ViewContainerRef;

  usuario: User;
  idUsuario = null;
  submitted = false;
  form: FormGroup;
  rut = '';
  idCliente = null;
  causasCliente = null;

  //! este valor se debe definir con el cliente creado o actualizado
  elPadreDice = null;
  // !ngmodels
  //?investigar por la necesidad de seguir utilizando ngmodel en formularios reactivos
  cliente: Cliente;
  //! fin ngmodel
  constructor(
    private resolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private alertService: AlertService,
    private causasService: CausasService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }
  idEmpresa = null;

  ngOnInit(): void {
    //?forzando la consulta a FirmaAbogados
    this.idEmpresa = '2';

    this.form = this.formBuilder.group({
      rut: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      email: ['', Validators.required],
      fono: ['', Validators.required],
      direccion: ['', Validators.required],
      idUsuario: this.idUsuario,
    });
    this.cliente = new Cliente();
  }
  get f() {
    return this.form.controls;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  buscarExistencia() {
    // this.rutFormat = this.formateaRut();
    this.cliente = new Cliente();
    this.f.rut.setValue(this.formateaRut());
    //TODO agregar metodo de servicio
    this.cliente.nombre = this.f.nombreCliente.value;
    this.cliente.email = this.f.email.value;
    this.cliente.direccion = this.f.direccion.value;
    this.cliente.fono = this.f.fono.value;
    this.cliente.idUsuario = this.idUsuario;
    this.cliente.rut = this.f.rut.value;
    this.clienteService
      .crearSinoExiste(this.cliente.rut, this.cliente)
      .pipe(first())
      .subscribe((x) => {
        this.elPadreDice = x;
        this.idCliente = this.elPadreDice.cliente.id;
        this.causasService
          .getCausasPorCliente(this.idCliente)

          .subscribe((x) => {
            this.causasCliente = x;
          });

        if (!this.elPadreDice.created) {
          this.f.nombreCliente.setValue(this.elPadreDice.cliente.nombre);
          this.f.email.setValue(this.elPadreDice.cliente.email);
          this.f.fono.setValue(this.elPadreDice.cliente.fono);
          this.f.direccion.setValue(this.elPadreDice.cliente.direccion);
          this.alertService.info(
            'El Usuario ya existe, confirme la informacion o actualice los datos'
          );
        } else {
          this.alertService.warn(
            'El Usuario no existe, complete la informacion y actualice los datos'
          );
        }
      });

    //?  findorcrate de sequelize
  }
  guardarCliente() {
    this.cliente = new Cliente();
    this.cliente.nombre = this.f.nombreCliente.value;
    this.cliente.idUsuario = this.idUsuario;
    this.cliente.email = this.f.email.value;
    this.cliente.fono = this.f.fono.value;
    this.cliente.direccion = this.f.direccion.value;
    this.cliente.rut = this.f.rut.value;
    this.clienteService
      .guardarCliente(this.cliente.rut, this.cliente)
      .pipe(first())
      .subscribe((x) => {
        this.idCliente = this.elPadreDice.cliente.id;

        this.alertService.success('Informacion guardada con exito');
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    // TODO metodo de servicio UpdateCliente();
  }
  detalleCausas() {
    //this.modalService.open('causas_modal');
  }
  formateaRut() {
    let value = this.f.rut.value.replace(/\./g, '').replace('-', '');
    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    } else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
    } else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
    } else if (value.match(/^(\d)(\d{0,2})$/)) {
      value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
    }

    return value;
  }

  //abrir componentes
  qMostrar = true;
  mostrarCausas() {
    if (this.qMostrar) {
      this.miFactory = this.resolver.resolveComponentFactory(
        CausasListComponent
      );
      this.componentRef = this.compDynamicContainer.createComponent(
        this.miFactory
      );
      this.causasService
        .getCausasPorCliente(this.idCliente)

        .subscribe((x) => {
          this.causasCliente = x;
          this.componentRef.instance.rowData = this.causasCliente;
          this.componentRef.instance.data = this.elPadreDice.cliente.nombre;
          this.qMostrar = false;
        });
    } else {
      this.componentRef.destroy();
      this.qMostrar = true;
    }
  }

  agregarCausas(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
