import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/_components';
import { EgresosRentacar, Empresa } from '@app/_models';
import {
  EgresoRentacarService,
  EmpresaService,
  ExcelService,
} from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-rentacar-list',
  templateUrl: './rentacar-list.component.html',
  styleUrls: ['./rentacar-list.component.scss'],
})
export class RentacarListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  egresos: EgresosRentacar[];
  egresosJQ: EgresosRentacar[];
  idEmpresa = null;
  id = null;
  mostrarList = true;
  empresa: Empresa;
  total = 0;

  // configuraicion tabla AgGrid main
  private gridApi: any;
  private gridApi2: any;
  private gridColumnApi: any;
  selectedRows: any[];
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
  // tabla AgGrid modal
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
    private egresoService: EgresoRentacarService,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private excelService: ExcelService,
    private http: HttpClient,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;

    this.egresoService.getAll().subscribe((data) => {
      console.table(data);
      this.rowData = data;
    });
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
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  //
  onSelectionChanged(): void {
    const selectedRows = this.gridApi2.getSelectedRows();
    this.egresoService.getFiles(selectedRows[0].url);
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
    console.table(this.selectedRows);
    const data = this.selectedRows.map((dato) => {
      dato.suscursal = dato.Sucursal.razonSocial;
      dato.usuario = dato.Usuario.nombreUsuario;
      dato.respaldos = dato.RespaldoEgresos.length;
      delete dato.Usuario;
      delete dato.Sucursal;
      delete dato.RespaldoEgresos;
      delete dato.idUsuario;
      delete dato.idSucursal;
      return dato;
    });
    this.excelService.exportAsExcelFile(data, 'egresos_rentacar');
  }
  detalleEgreso(): void {
    let rowView;

    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.modalService.open('documentosEgresoHostal');
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((row) => {
        rowView = row.id;
        this.rowFind = rowView;
        this.egresoService
          .getById(rowView)
          .pipe()
          .subscribe((data) => {
            this.rowData2 = data[0].RespaldoEgresos;
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
            this.detalle = x;
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
  mostrar(e): void {
    if (e.target.checked) {
      this.mostrarList = true;
      this.ngOnInit();
    } else {
      this.mostrarList = false;
      this.ngOnInit();
    }
  }
}
