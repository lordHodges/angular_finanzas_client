import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@app/_modal';
import { Causa } from '@app/_models';
import { CausasService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-causas-list',
  templateUrl: './causas-list.component.html',
  styleUrls: ['./causas-list.component.less'],
})
export class CausasListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData;
  rowDataO: any;
  data: any;

  private gridApi: any;
  private gridColumnApi: any;
  mPadre: string = '';
  selectedRows = null;

  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Codigo',
      field: 'codigo',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Titulo',
      field: 'titulo',
      sortable: true,
      filter: true,
    },

    {
      headerName: 'Estado Pago',
      field: 'estado',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Monto Total',
      field: 'montoCausa',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Saldo Pendiente',
      field: 'saldoPendiente',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Materia',
      field: 'materia',
      sortable: true,
      filter: true,
    },
  ];

  constructor(
    private causaService: CausasService,
    private modalService: ModalService
  ) {}

  ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }

  row = null;
  causa: Causa;
  cargar() {
    let rowView;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));

    this.selectedRows.forEach((x) => {
      rowView = x.id;
    });
    this.row = rowView;

    this.causaService
      .getCausa(this.row)
      .pipe(first())
      .subscribe((x) => {
        this.causa = x;
      });
    this.openModalPagoCausa('modal_pagoCausa');
  }
  openModalPagoCausa(id: string) {
    this.modalService.open(id);
  }
}
