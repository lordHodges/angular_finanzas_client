import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@app/_components/_modal';
import { ExcelService, IngresoRentacarService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-rentacar-list',
  templateUrl: './rentacar-list.component.html',
  styleUrls: ['./rentacar-list.component.less'],
})
export class RentacarListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  totalArriendo = 0;
  pagosArriendos = null;
  totales = { totalCliente: '', totalRemplazo: '' };
  //
  // ?configurando la tabla inicial
  private gridApi: any;
  private gridColumnApi: any;
  rowData: any;
  columnDefs = [
    {
      headerName: 'ID',
      field: 'id_arriendo',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Fecha Inicio',
      field: 'fechaEntrega_arriendo',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Total Arriendo',
      field: 'totalArriendo',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Estado Pago',
      field: 'estado_pago',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Fecha Estimada Recepcion',
      field: 'fechaRecepcion_arriendo',
      sortable: true,
      filter: true,
    },
    { field: 'estado_arriendo', sortable: true, filter: true },

    {
      headerName: 'Dias Efectivos',
      field: 'diasAcumulados_arriendo',
      sortable: true,
      filter: true,
    },
    { field: 'tipo_arriendo', sortable: true, filter: true },

    {
      headerName: 'Empresa Remplazo',
      field: 'remplazo.empresasRemplazo.nombre_empresaRemplazo',
      sortable: true,
      filter: true,
    },
  ];
  selectedRows: any[];
  //?

  constructor(
    private rentacarService: IngresoRentacarService,
    private modalService: ModalService,
    private excelService: ExcelService
  ) {}
  subtotalPago = 0;
  estado_pago = false;
  ngOnInit(): void {
    console.log('onInit');

    this.rentacarService
      .getArriendos()
      .pipe()
      .subscribe((x) => {
        this.rowData = x['data'];
        console.log(this.rowData);
        this.totalArriendo = 0;
      });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  exportAsXLSX(): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      const fechaF = new Date(x['createdAt']);
      const fechaG = new Date(x['updatedAt']);
      const formato = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      x['createdAt'] = fechaF.toLocaleDateString('es-GB', formato);
      x['updatedAt'] = fechaG.toLocaleDateString('es-GB', formato);
    });
    console.log(this.selectedRows);
    this.excelService.exportAsExcelFile(this.selectedRows, 'sample');
  }

  openDetalleModal() {
    let rowView;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));

    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id_arriendo;

        this.rentacarService
          .getDetallePago(rowView)
          .pipe()
          .subscribe((x) => {
            this.pagosArriendos = x['pagosArriendos'];
            this.totales = x['totales'];
            this.modalService.open('detallePagoArriendo');
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
}
