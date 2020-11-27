import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService, ExcelService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.less'],
})
export class ClientesComponent implements OnInit {
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
    { field: 'rut', sortable: true, filter: true },
    { field: 'nombre', sortable: true, filter: true },
    {
      field: 'fono',
    },
    { field: 'email' },

    {
      field: 'direccion',
    },
  ];
  selectedRows: any[];

  constructor(
    private excelService: ExcelService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.rowData = this.clienteService.obtenerClientes();
  }
  onGridReady(params): any {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  exportAsXLSX(): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.excelService.exportAsExcelFile(this.selectedRows, 'ListaClientes');
  }
}
