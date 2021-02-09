import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EgresoInmobiliariaService,
  EmpresaService,
  ExcelService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EgresosInmobiliaria, Empresa } from '@app/_models';
import { Observable, Subject, Subscription } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { ModalService } from '@app/_components/_modal';

@Component({
  selector: 'app-inmobiliaria-list',
  templateUrl: './inmobiliaria-list.component.html',
  styleUrls: ['./inmobiliaria-list.component.less'],
})
export class InmobiliariaListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi: any;
  private gridApi2: any;
  private gridColumnApi: any;
  selectedRows: any[];
  egresos: EgresosInmobiliaria[];

  idEmpresa = null;
  id = null;
  mostrarList = true;
  empresa: Empresa;
  total = 0;

  // mdtable

  rowFind;
  rowData: any;
  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { field: 'propiedad', sortable: true, filter: true },
    { field: 'fecha', sortable: true, filter: true },
    { field: 'monto', sortable: true, filter: true },
    { field: 'tipoEgreso', sortable: true, filter: true },
    { field: 'descripcion', sortable: true, filter: true },
    {
      headerName: 'Sucursal',
      field: 'Sucursal.razonSocial',
      sortable: true,
      filter: true,
    },

    {
      headerName: 'Usuario',
      field: 'Usuario.nombreUsuario',
      sortable: true,
      filter: true,
    },
  ];
  // tabla modal
  rowData2: any;
  columnDefs2 = [
    {
      headerName: 'Archivo',
      field: 'url',
      sortable: true,
      filter: true,
      checkboxSelection: false,
    },
  ];
  //

  constructor(
    private egresoService: EgresoInmobiliariaService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private excelService: ExcelService,
    private http: HttpClient,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    /* rescatar parametros de la ruta */
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;
    // extraer empresa y suscursales
    /* this.empresaService
      .getByIdWithSucursales(this.idEmpresa)
      .pipe(first())
      .subscribe((x) => {
        x.Sucursals = Object.values(x.Sucursals);

        this.empresa = x;
      }); */
    // consultar registros ingresados
    this.egresoService.getAll().subscribe((data) => {
      console.table(data);
      this.rowData = data;
    });
  }
  // modal metodos

  closeModal(id: string): void {
    this.modalService.close(id);
  }
  //
  onSelectionChanged(): void {
    const selectedRows = this.gridApi2.getSelectedRows();
    this.egresoService.getFiles(selectedRows[0].url);
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }

  getSelectedRows(): void {
    this.total = 0;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      this.total = this.total + Number(x.monto);
    });
  }
  exportAsXLSX(): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.excelService.exportAsExcelFile(this.selectedRows, 'sample');
  }

  ////////////////////////////////////
  mostrar(e): void {
    if (e.target.checked) {
      this.mostrarList = true;
      this.ngOnInit();
    } else {
      this.mostrarList = false;
      this.ngOnInit();
    }
  }
  ////////////////////////////
  detalleEgreso(): void {
    let rowView;

    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.modalService.open('modal_detalle');
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id;
        this.rowFind = rowView;
        this.egresoService
          .getById(rowView)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x[0].RespaldoEgresoInmobiliaria;
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }

    /* const egreso = this.egresos.find((x) => x.id === id);
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
  deleteEgreso(): void {
    let rowToDel;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowToDel = x.id;
      });
      if (
        confirm(`Esta seguro que desea eliminar el registro ID: ${rowToDel}`)
      ) {
        this.egresoService
          .delete(rowToDel)
          .pipe(first())
          .subscribe(() => {
            this.rowData = this.egresoService.getAll();
          }); 
      }
    } else {
      alert(
        `Atencion: No es posible eliminar ${this.selectedRows.length} Registros`
      );
    }

    /* const egreso = this.egresos.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      egreso.isDeleting = true;
      this.egresoService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.egresos = this.egresos.filter((x) => x.id !== id);
        });
      egreso.isDeleting = false;
    } */
  }
}
