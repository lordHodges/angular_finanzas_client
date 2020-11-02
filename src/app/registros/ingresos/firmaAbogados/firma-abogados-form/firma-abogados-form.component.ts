import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@app/_modal';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-firma-abogados-form',
  templateUrl: './firma-abogados-form.component.html',
  styleUrls: ['./firma-abogados-form.component.less'],
})
export class FirmaAbogadosFormComponent implements OnInit {
  usuario: User;
  idUsuario = null;
  submitted = false;
  form: FormGroup;
  rut = '';

  //! este valor se debe definir con el cliente creado o actualizado
  elPadreDice = 'hello world';
  // !ngmodels
  //?investigar por la necesidad de seguir utilizando ngmodel en formularios reactivos

  //! fin ngmodel
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rut: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      email: ['', Validators.required],
      fono: ['', Validators.required],
      direccion: ['', Validators.required],
      idUsuario: this.idUsuario,
    });
  }
  get f() {
    return this.form.controls;
  }

  buscarExistencia() {
    // this.rutFormat = this.formateaRut();
    this.f.rut.setValue(this.formateaRut());
    console.log(this.idUsuario);
    //TODO agregar metodo de servicio
    //!metodo de dominio no creado
    //? probablemente findorcrate de sequelize
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
    console.log(value);

    return value;
  }

  //!metodos de modal
  openModal(id: string) {
    console.log(id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
