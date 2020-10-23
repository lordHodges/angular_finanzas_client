import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AccountService, EmpresaService } from './_services';
import { User } from './_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  @ViewChild('sidebar') sidebar: ElementRef;
  user: User;
  empresas = null;

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
