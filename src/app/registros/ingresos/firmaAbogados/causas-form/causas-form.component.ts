import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuotasCausa, User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-causas-form',
  templateUrl: './causas-form.component.html',
  styleUrls: ['./causas-form.component.less'],
})
export class CausasFormComponent implements OnInit {
  @Input()
  idCliente: string;

  mensaje;
  cantidadCuotas: number = 1;
  cuotas: CuotasCausa[] = [];
  submitted = false;
  usuario: User;
  cuota = new CuotasCausa();
  idUsuario = null;
  form: FormGroup;
  dias = [5, 10, 15, 20, 30];
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      titulo: ['', Validators.required],
      sucursal: ['', Validators.required],
      abogado: ['', Validators.required],
      montoCausa: ['', Validators.required],
      cantidadCuotas: ['', Validators.required],
      montoCuota: [{ value: '', disabled: true }],
      diaPago: ['', Validators.required],
      fecha: [{ value: '', disabled: true }],

      idUsuario: this.idUsuario,
    });
  }
  calcularCuotas() {
    this.cantidadCuotas = 0;
    let c = [];
    let valorCuota = 0;

    this.cantidadCuotas = this.f.cantidadCuotas.value;
    valorCuota = this.f.montoCausa.value / this.cantidadCuotas;
    const fecha = new Date();
    for (let i = 0; i < this.cantidadCuotas; i++) {
      this.cuota = new CuotasCausa();

      let dia = this.f.diaPago.value;
      let mes = fecha.getMonth() + 2 + i;
      let año = fecha.getFullYear();
      if (mes > 12) {
        mes = mes - 12;
        año = año + 1;
      }

      this.cuota.montoCuota = valorCuota;
      this.cuota.fecha = `${dia}-${mes}-${año}`;

      c.push(this.cuota);
    }
    this.cuotas = c;
  }
  //TODO añadir metodos servicio
  onSubmit() {}
  get f() {
    return this.form.controls;
  }
}
