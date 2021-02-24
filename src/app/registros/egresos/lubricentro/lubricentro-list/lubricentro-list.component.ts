import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EgresoLubricentroService,
  EmpresaService,
  ExcelService,
} from '@app/_services';
import { first } from 'rxjs/operators';

import { EgresosLubricentro, Empresa } from '@app/_models';
import { Subscription } from 'rxjs';

import { AgGridAngular } from 'ag-grid-angular';
import { ModalService } from '@app/_components/_modal';

@Component({
  selector: 'app-lubricentro-list',
  templateUrl: './lubricentro-list.component.html',
  styleUrls: ['./lubricentro-list.component.scss'],
})
export class LubricentroListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi: any;
  private gridApi2: any;
  private gridColumnApi: any;
  selectedRows: any[];
  egresos: EgresosLubricentro[];
  _egreso: EgresosLubricentro;
  egresosJQ: EgresosLubricentro[];
  idEmpresa = null;
  id = null;
  mostrarList = true;
  subscripcion: Subscription;
  empresa: Empresa;
  total: number = 0;

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
    { field: 'fecha', sortable: true, filter: true },
    { field: 'monto', sortable: true, filter: true },
    { field: 'responsable', sortable: true, filter: true },
    { field: 'descripcion', sortable: true, filter: true },
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
    { field: 'idIngreso', sortable: true, filter: true },
  ];
  // Tabla Modal
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
    private egresoService: EgresoLubricentroService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private excelService: ExcelService,
    private http: HttpClient,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    /* rescatar parametros de la ruta */
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;
    // extraer empresa y suscursales
    /* this.empresaService
      .getByIdWithSucursales(this.idEmpresa)
      .pipe()
      .subscribe((x) => {
        x.Sucursals = Object.values(x.Sucursals);

        this.empresa = x;
      }); */
    // consultar registros ingresados
    this.egresoService
      .getAll()
      .pipe(first())
      .subscribe((x) => {
        this.egresosJQ = x;

      });
    // TODO campos de configuracion de datatable jq.
    this.rowData = this.egresoService.getAll();
  }
  // modal metodos

  closeModal(id: string) {
    this.modalService.close(id);
  }
  //
  onSelectionChanged() {
    var selectedRows = this.gridApi2.getSelectedRows();
    this.egresoService.getFiles(selectedRows[0].url);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
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

  detalleEgreso() {
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
            this.rowData2 = x[0].RespaldoEgresoLubricentros;
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
  detalle = null;
  getDetalleEgreso(): void {
    let rowView;

    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.modalService.open('detalleEgreso');
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id;
        this.rowFind = rowView;
        this.egresoService
          .getDetalleEgreso(rowView)
          .pipe()
          .subscribe((x) => {
            this.detalle = x[0];

          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
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
}
