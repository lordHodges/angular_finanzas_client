import { Component, OnInit } from '@angular/core';
import { first, find } from 'rxjs/operators';

import { EmpresaService } from '@app/_services';
@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss'],
})
export class EmpresaListComponent implements OnInit {
  empresas = null;
  constructor(private empresaService: EmpresaService) {}

  ngOnInit() {
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => (this.empresas = empresas));
    console.log(this.empresas);
  }
  deleteEmpresa(id: string) {
    const empresa = this.empresas.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      empresa.isDeleting = true;
      this.empresaService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.empresas = this.empresas.filter((x) => x.id !== id);
        });
      empresa.isDeleting = false;
    }
  }
}
