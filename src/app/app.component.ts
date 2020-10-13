import { Component } from '@angular/core';

import { AccountService, EmpresaService } from './_services';
import { User } from './_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  user: User;
  empresas = null;

  constructor(
    private accountService: AccountService,
    private empresaService: EmpresaService
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => (this.empresas = empresas));
  }

  logout() {
    this.accountService.logout();
  }
}
