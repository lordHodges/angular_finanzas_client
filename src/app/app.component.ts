import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AccountService, EmpresaService } from './_services';
import { User } from './_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidebar') sidebar: ElementRef;
  user: User;
  empresas = null;
  /* 
  https://www.google.com/maps/place/35°01'55.8"S+71°15'38.2"W/@-35.032158,-71.262809,17z
  */
  grados = '35°';
  minutos = "01'";
  segundos = '55.8"';
  grados2 = '71°';
  minutos2 = "15'";
  segundos2 = '38.2"W';

  localizacion = `https://maps.google.com/maps?q=-35.032158%2C-71.2606203&z=17&hl=es`;

  constructor(
    private accountService: AccountService,
    private empresaService: EmpresaService,
    private renderer: Renderer2
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => (this.empresas = empresas));
  }
  colapsarSide() {
    this.sidebar.nativeElement.classList.toggle('active');
  }

  logout() {
    this.accountService.logout();
  }
}
