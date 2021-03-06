import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@app/_components/_modal';
import { CuotaInicial } from '@app/_models';
import { ContratoAbogadoService, ExcelService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-contratos-list',
  templateUrl: './contratos-list.component.html',
  styleUrls: ['./contratos-list.component.scss'],
})
export class ContratosListComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData: any;
  data: any;
  idContrato = null;
  repacto = false;
  idCliente: any;

  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Fecha Contrato',
      field: 'fechaContrato',
      sortable: true,
      filter: true,
    },

    {
      headerName: 'N° Contrato',
      field: 'nContrato',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Monto Total',
      field: 'montoContrato',
      sortable: true,
    },

    {
      headerName: 'Saldo Pendiente',
      field: 'saldoPendiente',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Estado Pago',
      field: 'estadoPago',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Cliente',
      field: 'Cliente.rut',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Sucursal',
      field: 'Sucursal.razonSocial',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Usuario',
      field: 'Usuario.nombre',
      sortable: true,
      filter: true,
    },
  ];
  private gridApi: any;
  private gridColumnApi: any;
  selectedRows = null;

  submitted = false;
  form: FormGroup;

  contratoR = null;
  contratoId = null;
  datos = null;
  cuotas = null;

  constructor(
    private modalService: ModalService,
    private constratoService: ContratoAbogadoService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService
  ) {
    this.form = this.formBuilder.group({
      nCuotasNuevas: ['', Validators.required],
      nuevoMontoInicial: [{ value: '', disabled: false }],
      nuevaFechaInicio: ['', Validators.required],
      diasPago: ['', Validators.required],
    });
  }
  scrambleAndRefreshTopToBottom(): void {
    this.constratoService
      .obtenerContratosCliente(this.idCliente)
      .subscribe((data) => (this.rowData = data));
    let frame = 0;
    let i;
    let rowNode;
    const api = this.gridApi;
    for (i = 0; i < api.getPinnedTopRowCount(); i++) {
      rowNode = api.getPinnedTopRow(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < this.gridApi.getDisplayedRowCount(); i++) {
      rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < this.gridApi.getPinnedBottomRowCount(); i++) {
      rowNode = this.gridApi.getPinnedBottomRow(i);
      refreshRow(rowNode, api);
    }

    function refreshRow(rowNode, api): void {
      const millis = frame++ * 100;
      const rowNodes = [rowNode];
      const params = {
        rowNodes,
      };
      callRefreshAfterMillis(params, millis, api);
    }
    function callRefreshAfterMillis(params, millis, gridApi): void {
      setTimeout(() => {
        gridApi.refreshCells(params);
      }, millis);
    }
  }
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  registrarPago(): void {
    let rowView;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      rowView = x.id;
    });
    this.idContrato = rowView;
    this.modalService.open('pagoCuotas');
  }

  obtenerContrato(nContrato): void {
    this.constratoService.obtenerContratoNumero(nContrato).subscribe((x) => {
      this.contratoR = x;
    });
  }
  openRepactar(): void {
    let rowView;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      rowView = x.id;
    });

    this.idContrato = rowView;
    this.obtenerContrato(this.idContrato);
    this.modalService.open('repactar');
    this.repacto = true;
  }
  get f(): any {
    return this.form.controls;
  }

  calcularCuotas(): void {
    this.cuotas = [];
    this.datos = new CuotaInicial();
    this.datos.idContrato = this.contratoR.id;
    this.datos.nCuotas = this.f.nCuotasNuevas.value;
    this.datos.montoInicial = this.f.nuevoMontoInicial.value;
    this.datos.fechaInicio = this.f.nuevaFechaInicio.value;
    this.constratoService
      .calcularCuotas(this.datos)
      .pipe()
      .subscribe((x) => {
        this.cuotas = x;
      });
  }
  repactar(): void {
    this.constratoService
      .repactarContrato(this.contratoR.CuotasContratos, this.cuotas)
      .subscribe((x) => {
        console.log(x);
      });
  }
  exportAsXLSX(): void {
    const data = this.rowData;
    data.forEach((x) => {
      const fechaF = new Date(x.createdAt);
      const fechaG = new Date(x.updatedAt);
      const formato = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      x.createdAt = fechaF.toLocaleDateString('es-GB', formato);
      x.updatedAt = fechaF.toLocaleDateString('es-GB', formato);
    });
    this.excelService.exportAsExcelFile(data, 'sample');
  }
}
