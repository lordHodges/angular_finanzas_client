import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { EgresoHostalService, EmpresaService } from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EgresosHostal, Empresa } from '@app/_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hostal-list',
  templateUrl: './hostal-list.component.html',
  styleUrls: ['./hostal-list.component.less'],
})
export class HostalListComponent implements OnInit {
  egresos: EgresosHostal[];
  idEmpresa = null;
  id = null;
  mostrarList = true;
  filtrarSucursal = new FormControl('');
  filtrarFecha = new FormControl('');
  egresosFiltrados: EgresosHostal[] = [];
  subscripcion: Subscription;
  empresa: Empresa;

  //mdtable
  public fechas: any[] = [
    { valor: '01', nombre: 'Enero' },
    { valor: '02', nombre: 'Febrero' },
    { valor: '03', nombre: 'Marzo' },
    { valor: '04', nombre: 'Abril' },
    { valor: '05', nombre: 'Mayo' },
    { valor: '06', nombre: 'Junio' },
    { valor: '07', nombre: 'Julio' },
    { valor: '08', nombre: 'Agosto' },
    { valor: '09', nombre: 'Septiembre' },
    { valor: '10', nombre: 'Octubre' },
    { valor: '11', nombre: 'Agosto' },
    { valor: '12', nombre: 'Diciembre' },
  ];
  constructor(
    private egresoService: EgresoHostalService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) {}

  /////////////////////

  /////////////////////

  ngOnInit() {
    //////////////////////
    this.idEmpresa = this.route.snapshot.params['idEmpresa'];
    this.id = this.route.snapshot.params['id'];

    this.empresaService
      .getByIdWithSucursales(this.idEmpresa)
      .pipe(first())
      .subscribe((x) => {
        x['Sucursals'] = Object.values(x['Sucursals']);

        this.empresa = x;
        console.log(this.empresa);
      });

    this.egresoService
      .getAll()
      .pipe(first())
      .subscribe((egresos) => (this.egresos = egresos));
    this.egresosFiltrados = this.egresos;

    this.subscripcion = this.filtrarSucursal.valueChanges.subscribe((value) => {
      this.egresosFiltrados = this.egresos.filter(
        (item) => item.idSucursal == value
      );
    });
    this.subscripcion = this.filtrarFecha.valueChanges.subscribe((value) => {
      this.egresosFiltrados = this.egresos.filter((item) =>
        item.fecha.includes(`-${value}-`)
      );
    });
  }

  public ngOnDestroy() {
    this.subscripcion.unsubscribe();
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
    const egreso = this.egresos.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      egreso.isDeleting = true;
      this.egresoService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.egresos = this.egresos.filter((x) => x.id !== id);
        });
      egreso.isDeleting = false;
    }
  }
}
