import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccountService,
  AlertService,
  BancoService,
  CuentasBancariasService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-cuentas-bancarias',
  templateUrl: './cuentas-bancarias.component.html',
  styleUrls: ['./cuentas-bancarias.component.scss'],
})
export class CuentasBancariasComponent implements OnInit {
  // ?datos de entrada
  usuario = null;
  idUsuario = null;
  idEntidad = null;
  bancos = [];

  // set form
  form: FormGroup;
  isAddMode: boolean;
  submited = false;

  // set table
  cuentasBancarias = null;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private cuentasService: CuentasBancariasService,
    private bancoService: BancoService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit(): void {
    this.idEntidad = this.route.snapshot.params.idEntidad;
    this.cuentasService
      .getAllByEntity(this.idEntidad)
      .pipe(first())
      .subscribe((cuentas) => {
        this.cuentasBancarias = cuentas;
        console.log(this.cuentasBancarias);
      });
    this.bancoService
      .getAll()
      .pipe(first())
      .subscribe((bancos) => {
        this.bancos = bancos;
      });
    this.form = this.formBuilder.group({
      idBanco: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      numeroCuenta: ['', Validators.required],
      idProyecto: this.idEntidad,
    });
  }
  crearCuenta(): void {
    this.cuentasService
      .create(this.form.value)
      .pipe(first())
      .subscribe((cuenta) => {
        console.log(cuenta);
        this.ngOnInit();
      });
  }
  get f(): any {
    return this.form.controls;
  }
}
