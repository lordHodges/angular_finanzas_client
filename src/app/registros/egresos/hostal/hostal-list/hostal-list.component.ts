import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { EgresoHostalService } from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hostal-list',
  templateUrl: './hostal-list.component.html',
  styleUrls: ['./hostal-list.component.less'],
})
export class HostalListComponent implements OnInit {
  egresos = null;
  idEmpresa = null;
  id = null;
  mostrarList = true;

  //mdtable

  constructor(
    private egresoService: EgresoHostalService,
    private route: ActivatedRoute
  ) {}

  /////////////////////

  /////////////////////

  ngOnInit() {
    //////////////////////
    this.idEmpresa = this.route.snapshot.params['idEmpresa'];
    this.id = this.route.snapshot.params['id'];

    this.egresoService
      .getAll()
      .pipe(first())
      .subscribe((egresos) => (this.egresos = egresos));
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
  deleteEgreso(id: string) {
    const ingreso = this.egresos.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      ingreso.isDeleting = true;
      this.egresoService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.egresos = this.egresos.filter((x) => x.id !== id);
        });
      ingreso.isDeleting = false;
    }
  }
}
