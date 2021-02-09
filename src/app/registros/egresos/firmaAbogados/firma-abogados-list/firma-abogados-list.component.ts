import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EgresoFirmaService,
  EmpresaService,
  ExcelService,
} from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { RegistroEgresoFirma, Empresa } from '@app/_models';
import { Observable, Subject, Subscription } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { ModalService } from '@app/_components/_modal';

@Component({
  selector: 'app-firma-abogados-list',
  templateUrl: './firma-abogados-list.component.html',
  styleUrls: ['./firma-abogados-list.component.scss'],
})
export class FirmaAbogadosListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi: any;
  private gridColumnApi: any;
  private gridApi2: any;
  selectedRows: any[];
  egresos: RegistroEgresoFirma[];
  _egreso: RegistroEgresoFirma;
  egresosJQ: RegistroEgresoFirma[];
  idEmpresa = null;
  id = null;
  mostrarList = true;
  subscripcion: Subscription;
  empresa: Empresa;
  total = 0;
  ////
  ////
  //tabla List
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
    { field: 'fecha', sortable: true, filter: true },
    { field: 'monto', sortable: true, filter: true },
    {
      headerName: 'Sucursal',
      field: 'Sucursal.razonSocial',
      sortable: true,
      filter: true,
    },
    { field: 'tipoEgreso', sortable: true, filter: true },

    {
      headerName: 'Usuario',
      field: 'Usuario.nombreUsuario',
      sortable: true,
      filter: true,
    },
  ];
  ////
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

  constructor(
    private egresoService: EgresoFirmaService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private excelService: ExcelService,
    private http: HttpClient,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    /* rescatar parametros de la ruta */
    // this.idEmpresa = this.route.snapshot.params['idEmpresa'];
    this.id = this.route.snapshot.params['id'];
    // extraer empresa y suscursales
    /* this.empresaService
      .getByIdWithSucursales(this.idEmpresa)
      .pipe(first())
      .subscribe((x) => {
        x['Sucursals'] = Object.values(x['Sucursals']);

        this.empresa = x;
      }); */
    //consultar registros ingresados
    this.egresoService
      .getAll()
      .pipe(first())
      .subscribe((x) => (this.egresosJQ = x));
    //TODO campos de configuracion de datatable jq.
    this.rowData = this.egresoService.getAll();
  }
  onSelectionChanged() {
    var selectedRows = this.gridApi2.getSelectedRows();
    this.egresoService.getFiles(selectedRows[0].url);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  //

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  //tabla modal
  onGridReady2(params) {
    this.gridApi2 = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  getSelectedRows() {
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
  mostrar(e) {
    if (e.target.checked) {
      this.mostrarList = true;
      this.ngOnInit();
    } else {
      this.mostrarList = false;
      this.ngOnInit();
    }
  }
  ////////////////////////////
  detalleEgreso() {
    let rowView;

    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.modalService.open('documentosEgresoFirma');
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id;
        this.rowFind = rowView;

        this.egresoService
          .getById(rowView)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x[0].RespaldoEgresos;
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
  deleteEgreso() {
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
  }
}
