import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-causas-list',
  templateUrl: './causas-list.component.html',
  styleUrls: ['./causas-list.component.less'],
})
export class CausasListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  @Input()
  idCliente: string;

  gridApi;
  gridColumnApi;
  rowData: any;
  columnDefs = [];
  mPadre: string = '';
  constructor() {}

  ngOnInit(): void {
    this.mPadre = this.idCliente;
    //! se debe definir el valor de rowdata con get causas cliente
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
}
