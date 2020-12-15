import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@app/_components/_modal';
import { ContratoAbogado, CuotaInicial, Empresa, User } from '@app/_models';
import {
  AccountService,
  ContratoAbogadoService,
  EmpresaService,
} from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-contratos-form',
  templateUrl: './contratos-form.component.html',
  styleUrls: ['./contratos-form.component.scss'],
})
export class ContratosFormComponent implements OnInit {
  @Input()
  idEmpresa;
  @Input()
  idCliente;
  @Input()
  idContrato;
  @Input()
  repacto;
  //
  //
  form: FormGroup;
  usuario: User;
  idUsuario = null;
  empresa = new Empresa();
  submitted = false;
  cuotas = null;
  dias = [5, 10, 15, 20, 30];
  changelog: string[] = [];
  constratoExiste = false;
  datos: CuotaInicial;
  contrato = new ContratoAbogado();
  contratoF = null;
  cambiarForm = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private empresaService: EmpresaService,
    private contratoService: ContratoAbogadoService,
    private modalService: ModalService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }
  ngOnChanges(changes: SimpleChanges): any {
    console.log('OnChanges');

    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      this.cambiarForm = this.repacto;
      this.contratoService
        .obtenerContratoNumero(this.idContrato)
        .pipe()
        .subscribe((x) => {
          this.contratoF = x;
          console.log(this.contratoF);
          console.log(this.cambiarForm);
        });
    }

    this.obtenerEmpresa(this.idEmpresa);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nContrato: ['', Validators.required],
      fechaContrato: ['', Validators.required],
      sucursal: ['', Validators.required],
      montoContrato: ['', Validators.required],
      nCuotas: ['', Validators.required],
      montoInicial: [{ value: '', disabled: false }],
      fechaInicio: ['', Validators.required],
      diasPago: ['', Validators.required],

      idUsuario: this.idUsuario,
    });
  }
  onSubmit(): any {}
  validarContrato(): void {
    this.contrato.montoContrato = this.f.montoContrato.value;
    this.contrato.fechaContrato = this.f.fechaContrato.value;
    this.contrato.idCliente = this.idCliente;
    this.contrato.idSucursal = this.f.sucursal.value;
    this.contrato.idUsuario = this.idUsuario;
    this.contrato.nContrato = this.f.nContrato.value;
    this.contrato.saldoPendiente = this.f.montoContrato.value;

    this.contrato.estadoPago = 'pendiente';
    this.contratoService
      .crearSinoExiste(this.contrato)
      .pipe()
      .subscribe((x) => {
        alert(`${x.respuesta}`);
        this.contrato = x.contrato;
      });
  }
  calcularCuotas(): any {
    this.cuotas = [];
    this.datos = new CuotaInicial();
    this.datos.idContrato = this.contrato.id;
    this.datos.nCuotas = this.f.nCuotas.value;
    this.datos.montoInicial = this.f.montoInicial.value;
    this.datos.fechaInicio = this.f.fechaInicio.value;
    this.contratoService
      .calcularCuotas(this.datos)
      .pipe()
      .subscribe((x) => {
        this.cuotas = x;
      });
  }
  guardarContrato(): any {
    this.contratoService
      .guardarCuotas(this.cuotas)
      .pipe()
      .subscribe((x) => {
        console.log(x);
        this.modalService.close('addContratos');
      });
  }
  get f(): any {
    return this.form.controls;
  }
  obtenerEmpresa(id: string): any {
    this.empresaService
      .getByIdWithSucursales(id)
      .pipe(first())
      .subscribe((x) => {
        x.Sucursals = Object.values(x.Sucursals);

        this.empresa = x;
      });
  }
}
