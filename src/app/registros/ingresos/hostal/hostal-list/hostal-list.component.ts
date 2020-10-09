import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { IngresoHostalService } from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hostal-list',
  templateUrl: './hostal-list.component.html',
  styleUrls: ['./hostal-list.component.less'],
})
export class HostalListComponent implements OnInit {
  ingresos = null;
  idEmpresa = null;
  id = null;
  mostrarList = true;

  //mdtable

  constructor(
    private ingresoService: IngresoHostalService,
    private route: ActivatedRoute
  ) {}

  /////////////////////

  /////////////////////

  ngOnInit() {
    //////////////////////
    this.idEmpresa = this.route.snapshot.params['idEmpresa'];
    this.id = this.route.snapshot.params['id'];

    this.ingresoService
      .getAllWithUsuario()
      .pipe(first())
      .subscribe((ingresos) => (this.ingresos = ingresos));
  }
  ///metodo de busqueda en tabla

  ////////////////////////////////////
  mostrar(e) {
    if (e.target.checked) {
      this.mostrarList = true;
      this.ngOnInit();
    } else {
      this.mostrarList = false;
      this.ngOnInit();
    }
  }
  deleteIngreso(id: string) {
    const ingreso = this.ingresos.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      ingreso.isDeleting = true;
      this.ingresoService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.ingresos = this.ingresos.filter((x) => x.id !== id);
        });
      ingreso.isDeleting = false;
    }
  }
}
