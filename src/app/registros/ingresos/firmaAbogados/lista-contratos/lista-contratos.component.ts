import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratoAbogadoService, ExcelService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss'],
})
export class ListaContratosComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  // configuracion tabla;
  private gridApi: any;
  private gridColumnApi: any;
  rowData: any;
  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { field: 'fechaContrato', sortable: true, filter: true },
    { field: 'montoContrato', sortable: true, filter: true },
    {
      field: 'estadoPago',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'rut Cliente',
      field: 'clienteRut',
    },
    { field: 'cliente' },

    {
      field: 'sucursal',
      sortable: true,
      filter: true,
    },
    {
      field: 'usuario',
      sortable: true,
      filter: true,
    },
  ];
  selectedRows: any[];
  constructor(
    private contratoService: ContratoAbogadoService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.rowData = this.contratoService.obtenerContratos();
  }
  onGridReady(params): any {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  exportAsXLSX(): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.excelService.exportAsExcelFile(this.selectedRows, 'ListaContratos');
  }
}
