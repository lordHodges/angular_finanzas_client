import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/_modal';
import { Causa, CuotasCausa, Empresa, User } from '@app/_models';
import {
  AccountService,
  AlertService,
  CausasService,
  EmpresaService,
} from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-causas-form',
  templateUrl: './causas-form.component.html',
  styleUrls: ['./causas-form.component.less'],
})
export class CausasFormComponent implements OnChanges, OnInit {
  @Input()
  idCliente: string;
  @Input()
  idEmpresa: string;
  //
  //

  rolExiste = false;
  created = null;
  causa: Causa;
  empresa = new Empresa();
  mensaje;
  msje;
  cantidadCuotas: number = 1;
  cuotas = null;
  submitted = false;
  usuario: User;
  cuota = null;
  idUsuario = null;
  form: FormGroup;
  dias = [5, 10, 15, 20, 30];
  changelog: string[] = [];
  nombreCliente: string;
  rutCliente: string;
  idcli = null;
  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private causaService: CausasService,
    private alertService: AlertService,
    private modalservice: ModalService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName in changes) {
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
    }
    this.obtenerEmpresa(this.idEmpresa);
  }

  obtenerEmpresa(id: string) {
    this.empresaService
      .getByIdWithSucursales(id)
      .pipe(first())
      .subscribe((x) => {
        x['Sucursals'] = Object.values(x['Sucursals']);

        this.empresa = x;
      });
  }

  ngOnInit(): void {
    console.log('OnInit');
    //! este valor viaja en el router template es un valor estatico conocido

    //! cargando las sucursales de la empresa

    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      titulo: ['', Validators.required],
      sucursal: ['', Validators.required],
      abogado: ['', Validators.required],
      montoCausa: ['', Validators.required],
      materia: ['', Validators.required],
      cantidadCuotas: ['', Validators.required],
      montoCuota: [{ value: '', disabled: true }],
      diaPago: ['', Validators.required],
      fecha: [{ value: '', disabled: true }],

      idUsuario: this.idUsuario,
    });
  }

  buscarCausa() {
    this.causa = new Causa();
    this.causa.codigo = this.f.codigo.value;

    this.causaService
      .crearSinoExiste(this.causa.codigo, this.causa)
      .pipe(first())
      .subscribe((x) => {
        this.created = x;
        if (!this.created.created) {
          console.log(this.created.causa);
          this.msje = 'el codigo ya esta registrado por favor revizar codigo';
          this.rolExiste = false;
          this.f.titulo.setValue(this.created.causa.titulo);
          this.f.sucursal.setValue(this.created.causa.idSucursal);
          //!agregr abogados
          this.f.montoCausa.setValue(this.created.causa.montoCausa);
          this.f.materia.setValue(this.created.causa.materia);
          //!agregar cuotas
          this.cuotas = this.created.causa.CuotasCausas;
          this.nombreCliente = this.created.causa.Cliente.nombre;
          this.rutCliente = this.created.causa.Cliente.rut;
          console.log(this.created.causa);
        } else {
          this.msje = 'el codigo esta disponible por favor agregar informacion';
          this.rolExiste = true;
          this.nombreCliente = '';
        }
      });
  }
  guardarCausa() {
    this.causa = new Causa();
    this.causa.titulo = this.f.titulo.value;
    this.causa.codigo = this.f.codigo.value;
    this.causa.idCliente = this.idCliente.toString();
    this.causa.idUsuario = this.idUsuario.toString();
    this.causa.idSucursal = this.f.sucursal.value;
    this.causa.CuotasCausas = this.cuotas;
    this.causa.montoCausa = this.f.montoCausa.value;
    this.causa.saldoPendiente = this.f.montoCausa.value;
    this.causa.estado = 'pendiednte';
    //!agregar abogados
    this.causa.materia = this.f.materia.value;
    let contenido = null;
    this.causaService
      .guardarCausa(this.causa)
      .pipe(first())
      .subscribe((x) => {
        contenido = x;
        console.log(contenido);
      });
  }
  calcularCuotas() {
    this.cuotas = [];
    this.cantidadCuotas = 0;

    let valorCuota = 0;

    this.cantidadCuotas = this.f.cantidadCuotas.value;
    valorCuota = this.f.montoCausa.value / this.cantidadCuotas;
    const fecha = new Date();
    for (let i = 0; i < this.cantidadCuotas; i++) {
      this.cuota = {};

      let dia = this.f.diaPago.value;
      let mes = fecha.getMonth() + 2 + i;
      let año = fecha.getFullYear();
      if (mes > 12) {
        mes = mes - 12;
        año = año + 1;
      }

      this.cuota.montoCuota = valorCuota;
      this.cuota.fechaPago = `${dia}-${mes}-${año}`;
      this.cuota.estado = 'pendiente';
      this.cuotas.push(this.cuota);
    }
  }
  //TODO añadir metodos servicio
  onSubmit() {}
  get f() {
    return this.form.controls;
  }
}
